import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type {
  CreateWardrobeTemplateInput,
  UpdateWardrobeTemplateInput,
} from "@clothset/shared-schemas";

@Injectable()
export class WardrobeTemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany() {
    return this.prisma.db.orm.public.WardrobeTemplate.all();
  }

  async findById(id: string) {
    return this.prisma.db.orm.public.WardrobeTemplate.where({ id }).first();
  }

  async count(): Promise<number> {
    const list = await this.prisma.db.orm.public.WardrobeTemplate.select("id").all();
    return list.length;
  }

  async create(data: CreateWardrobeTemplateInput) {
    return this.prisma.db.orm.public.WardrobeTemplate.create({
      name: data.name,
      description: data.description ?? null,
      type: data.type || "EVERYDAY",
      minTier: data.minTier || "FREE",
    });
  }

  async update(id: string, data: UpdateWardrobeTemplateInput) {
    return this.prisma.db.orm.public.WardrobeTemplate.where({ id }).update({
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description ?? null }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.minTier !== undefined && { minTier: data.minTier }),
    });
  }

  async delete(id: string) {
    return this.prisma.db.orm.public.WardrobeTemplate.where({ id }).delete();
  }
}
