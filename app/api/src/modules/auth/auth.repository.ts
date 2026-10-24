import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateUserInput, UpdateUserInput } from "@clothset/shared-schemas/user.schema";

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.db.orm.public.User.where({ email }).first();
  }

  async findById(id: string) {
    return this.prisma.db.orm.public.User.where({ id }).first();
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.prisma.db.orm.public.User.select("id").where({ email }).first();
    return Boolean(user);
  }

  async create(data: CreateUserInput) {
    return this.prisma.db.orm.public.User.create({
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name ?? null,
      plan: data.plan ?? "FREE",
      provider: data.provider ?? null,
      providerId: data.providerId ?? null,
    });
  }

  async update(id: string, data: UpdateUserInput) {
    return this.prisma.db.orm.public.User.where({ id }).update(data);
  }
}
