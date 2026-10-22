import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { OnModuleInit } from "@nestjs/common";
import { WardrobeTemplateRepository } from "./wardrobe-template.repository";
import type {
  UserPlan,
  CreateWardrobeTemplateInput,
  UpdateWardrobeTemplateInput,
} from "@clothset/shared-schemas";

export function isTierEligible(userTier: UserPlan, minTier: UserPlan): boolean {
  if (userTier === "ELITE") return true;
  if (userTier === "PLUS") return minTier === "FREE" || minTier === "PLUS";
  return minTier === "FREE";
}

@Injectable()
export class WardrobeTemplateService implements OnModuleInit {
  constructor(private readonly repository: WardrobeTemplateRepository) {}

  async onModuleInit() {
    await this.seedInitialTemplatesIfEmpty();
  }

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

  private async seedInitialTemplatesIfEmpty() {
    const count = await this.repository.count();
    if (count > 0) return;

    const initialTemplates: CreateWardrobeTemplateInput[] = [
      {
        name: "Everyday Essentials",
        description: "Versatile basics and daily go-to rotation",
        type: "EVERYDAY",
        minTier: "FREE",
      },
      {
        name: "Capsule Basics",
        description: "Curated minimalist collection of core staples",
        type: "CAPSULE",
        minTier: "FREE",
      },
      {
        name: "Work & Office",
        description: "Tailored blazers, trousers, and smart professional attire",
        type: "WORK",
        minTier: "PLUS",
      },
      {
        name: "Seasonal Rotation",
        description: "Weather-specific collection for temperature transitions",
        type: "SEASONAL",
        minTier: "PLUS",
      },
      {
        name: "Weekend Casual",
        description: "Relaxed off-duty fits, denim, and laid-back comfort",
        type: "EVERYDAY",
        minTier: "PLUS",
      },
      {
        name: "Formal & Evening",
        description: "Gowns, suits, cocktail attire, and black-tie essentials",
        type: "FORMAL",
        minTier: "ELITE",
      },
      {
        name: "Designer Showcase",
        description: "High-end luxury statement pieces and collector garments",
        type: "CUSTOM",
        minTier: "ELITE",
      },
      {
        name: "Travel & Holiday",
        description: "Resort wear, travel capsules, and vacation pairings",
        type: "SEASONAL",
        minTier: "ELITE",
      },
    ];

    for (const item of initialTemplates) {
      await this.repository.create(item);
    }
  }
}
