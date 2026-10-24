import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { WardrobeTemplateRepository } from "./wardrobe-template.repository";
import type { UserPlan } from "@clothset/shared-schemas/user.schema";
import type {
  CreateWardrobeTemplateInput,
  UpdateWardrobeTemplateInput,
} from "@clothset/shared-schemas/closet.schema";

export function isTierEligible(userTier: UserPlan, minTier: UserPlan): boolean {
  if (userTier === "ELITE") return true;
  if (userTier === "PLUS") return minTier === "FREE" || minTier === "PLUS";
  return minTier === "FREE";
}

@Injectable()
export class WardrobeTemplateService {
  constructor(private readonly repository: WardrobeTemplateRepository) {}

  async getAllTemplates() {
    return this.repository.findMany();
  }

  async getTemplatesForUser(userTier: UserPlan) {
    const templates = await this.repository.findMany();
    return templates.map((t) => ({
      ...t,
      isEligible: isTierEligible(userTier, t.minTier as UserPlan),
    }));
  }

  async getTemplateById(id: string) {
    const template = await this.repository.findById(id);
    if (!template) {
      throw new NotFoundException("Wardrobe template not found");
    }
    return template;
  }

  async create(data: CreateWardrobeTemplateInput) {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateWardrobeTemplateInput) {
    await this.getTemplateById(id);
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.getTemplateById(id);
    await this.repository.delete(id);
    return { success: true };
  }
}
