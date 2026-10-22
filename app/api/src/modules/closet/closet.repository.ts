import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateClosetInput, UpdateClosetInput } from "@clothset/shared-schemas";

@Injectable()
export class ClosetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByUserId(userId: string) {
    return this.prisma.db.orm.public.Closet.where({ userId }).all();
  }

  async findById(id: string) {
    return this.prisma.db.orm.public.Closet.where({ id }).first();
  }

  async findByUserAndTemplate(userId: string, templateId: string) {
    return this.prisma.db.orm.public.Closet.where({ userId, templateId }).first();
  }

  async countByUserId(userId: string): Promise<number> {
    const list = await this.prisma.db.orm.public.Closet.select("id").where({ userId }).all();
    return list.length;
  }

  async countClothes(closetId: string): Promise<number> {
    const items = await this.prisma.db.orm.public.ClothingItem.select("id").where({ closetId }).all();
    return items.length;
  }

  async create(userId: string, data: CreateClosetInput) {
    return this.prisma.db.orm.public.Closet.create({
      userId,
      name: data.name,
      type: data.type || "EVERYDAY",
      description: data.description ?? null,
      maxItems: data.maxItems ?? 20,
      templateId: data.templateId ?? null,
    });
  }

  async update(id: string, data: UpdateClosetInput) {
    return this.prisma.db.orm.public.Closet.where({ id }).update({
      ...(data.name !== undefined && { name: data.name }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.description !== undefined && { description: data.description ?? null }),
      ...(data.maxItems !== undefined && { maxItems: data.maxItems }),
    });
  }

  async delete(id: string) {
    return this.prisma.db.orm.public.Closet.where({ id }).delete();
  }
}
