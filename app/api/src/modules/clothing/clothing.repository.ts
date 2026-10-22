import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type {
  ClothingCategory,
  CreateClothingInput,
  UpdateClothingInput,
} from "@clothset/shared-schemas";

@Injectable()
export class ClothingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByClosetId(closetId: string, category?: ClothingCategory) {
    if (category) {
      return this.prisma.db.orm.public.ClothingItem.where({ closetId, category }).all();
    }
    return this.prisma.db.orm.public.ClothingItem.where({ closetId }).all();
  }

  async findManyByUserId(userId: string, category?: ClothingCategory) {
    if (category) {
      return this.prisma.db.orm.public.ClothingItem.where({ userId, category }).all();
    }
    return this.prisma.db.orm.public.ClothingItem.where({ userId }).all();
  }

  async findById(id: string) {
    return this.prisma.db.orm.public.ClothingItem.where({ id }).first();
  }

  async countByClosetId(closetId: string): Promise<number> {
    const list = await this.prisma.db.orm.public.ClothingItem.select("id").where({ closetId }).all();
    return list.length;
  }

  async create(userId: string, closetId: string, data: CreateClothingInput) {
    return this.prisma.db.orm.public.ClothingItem.create({
      userId,
      closetId,
      name: data.name,
      category: data.category,
      subcategory: data.subcategory ?? null,
      color: data.color ?? null,
      brand: data.brand ?? null,
      material: data.material ?? null,
      style: data.style ?? null,
      seasons: data.seasons ?? [],
      occasions: data.occasions ?? [],
      description: data.description ?? null,
      imageKey: data.imageKey ?? null,
      thumbnailKey: data.thumbnailKey ?? null,
      isFavorite: data.isFavorite ?? false,
      isArchived: data.isArchived ?? false,
    });
  }

  async update(id: string, data: UpdateClothingInput) {
    return this.prisma.db.orm.public.ClothingItem.where({ id }).update({
      ...(data.name !== undefined && { name: data.name }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.subcategory !== undefined && { subcategory: data.subcategory ?? null }),
      ...(data.color !== undefined && { color: data.color ?? null }),
      ...(data.brand !== undefined && { brand: data.brand ?? null }),
      ...(data.material !== undefined && { material: data.material ?? null }),
      ...(data.style !== undefined && { style: data.style ?? null }),
      ...(data.seasons !== undefined && { seasons: data.seasons }),
      ...(data.occasions !== undefined && { occasions: data.occasions }),
      ...(data.description !== undefined && { description: data.description ?? null }),
      ...(data.imageKey !== undefined && { imageKey: data.imageKey ?? null }),
      ...(data.thumbnailKey !== undefined && { thumbnailKey: data.thumbnailKey ?? null }),
      ...(data.isFavorite !== undefined && { isFavorite: data.isFavorite }),
      ...(data.isArchived !== undefined && { isArchived: data.isArchived }),
    });
  }

  async delete(id: string) {
    return this.prisma.db.orm.public.ClothingItem.where({ id }).delete();
  }
}
