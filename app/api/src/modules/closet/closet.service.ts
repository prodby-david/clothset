import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { ClosetRepository } from "./closet.repository";
import { AuthRepository } from "../auth/auth.repository";
import { WardrobeTemplateRepository } from "../wardrobe-template/wardrobe-template.repository";
import { isTierEligible } from "../wardrobe-template/wardrobe-template.service";
import {
  TIER_LIMITS,
  type UserPlan,
} from "@clothset/shared-schemas/user.schema";
import type {
  CreateClosetInput,
  UpdateClosetInput,
} from "@clothset/shared-schemas/closet.schema";

@Injectable()
export class ClosetService {
  constructor(
    private readonly closetRepository: ClosetRepository,
    private readonly authRepository: AuthRepository,
    private readonly templateRepository: WardrobeTemplateRepository,
  ) {}

  private async getUserPlan(userId: string): Promise<UserPlan> {
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const plan = (user.plan as UserPlan) || "FREE";
    return TIER_LIMITS[plan] ? plan : "FREE";
  }

  async getClosets(userId: string) {
    const closets = await this.closetRepository.findManyByUserId(userId);
    return Promise.all(
      closets.map(async (closet) => {
        const clothesCount = await this.closetRepository.countClothes(closet.id);
        return {
          ...closet,
          clothesCount,
          maxSize: closet.maxItems,
        };
      })
    );
  }

  async getClosetById(userId: string, closetId: string) {
    const closet = await this.closetRepository.findById(closetId);
    if (!closet) {
      throw new NotFoundException("Wardrobe not found");
    }
    if (closet.userId !== userId) {
      throw new ForbiddenException("Access denied to this wardrobe");
    }
    const clothesCount = await this.closetRepository.countClothes(closet.id);
    return {
      ...closet,
      clothesCount,
      maxSize: closet.maxItems,
    };
  }

  async createCloset(userId: string, data: CreateClosetInput) {
    const plan = await this.getUserPlan(userId);
    const tier = TIER_LIMITS[plan];

    const currentCount = await this.closetRepository.countByUserId(userId);
    if (currentCount >= tier.maxClosets) {
      throw new ForbiddenException(
        `Wardrobe limit reached. Your ${plan} plan allows up to ${tier.maxClosets} wardrobes.`
      );
    }

    const requestedMax = data.maxItems || tier.maxItemsPerCloset;
    if (requestedMax > tier.maxItemsPerCloset) {
      throw new BadRequestException(
        `Capacity exceeds your ${plan} plan limit of ${tier.maxItemsPerCloset} items per wardrobe.`
      );
    }

    const closet = await this.closetRepository.create(userId, {
      ...data,
      maxItems: requestedMax,
    });

    return {
      ...closet,
      clothesCount: 0,
    };
  }

  async updateCloset(userId: string, closetId: string, data: UpdateClosetInput) {
    const existing = await this.getClosetById(userId, closetId);
    const plan = await this.getUserPlan(userId);
    const tier = TIER_LIMITS[plan];

    if (data.maxItems !== undefined && data.maxItems > tier.maxItemsPerCloset) {
      throw new BadRequestException(
        `Capacity exceeds your ${plan} plan limit of ${tier.maxItemsPerCloset} items per wardrobe.`
      );
    }

    const updated = await this.closetRepository.update(closetId, data);
    return {
      ...updated,
      clothesCount: existing.clothesCount,
    };
  }

  async deleteCloset(userId: string, closetId: string) {
    await this.getClosetById(userId, closetId);
    await this.closetRepository.delete(closetId);
    return { success: true };
  }

  async activateTemplate(userId: string, templateId: string) {
    const template = await this.templateRepository.findById(templateId);
    if (!template) {
      throw new NotFoundException("Wardrobe template not found");
    }

    const plan = await this.getUserPlan(userId);
    const tier = TIER_LIMITS[plan];

    if (!isTierEligible(plan, template.minTier as UserPlan)) {
      throw new ForbiddenException(
        `This wardrobe template requires the ${template.minTier} plan. Your current plan is ${plan}.`
      );
    }

    const currentCount = await this.closetRepository.countByUserId(userId);
    if (currentCount >= tier.maxClosets) {
      throw new BadRequestException(
        `Wardrobe limit reached (${currentCount}/${tier.maxClosets}). Upgrade your plan to activate more wardrobes.`
      );
    }

    const alreadyActive = await this.closetRepository.findByUserAndTemplate(userId, templateId);
    if (alreadyActive) {
      throw new BadRequestException("You have already activated this wardrobe template.");
    }

    const closet = await this.closetRepository.create(userId, {
      name: template.name,
      description: template.description || undefined,
      type: template.type,
      maxItems: tier.maxItemsPerCloset,
      templateId: template.id,
    });

    return {
      ...closet,
      clothesCount: 0,
      maxSize: closet.maxItems,
    };
  }
}
