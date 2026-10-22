import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.db.orm.public.Admin.where({ email }).first();
  }

  async findById(id: string) {
    return this.prisma.db.orm.public.Admin.where({ id }).first();
  }

  async count(): Promise<number> {
    const list = await this.prisma.db.orm.public.Admin.select("id").all();
    return list.length;
  }

  async create(data: { email: string; passwordHash: string; name?: string | null }) {
    return this.prisma.db.orm.public.Admin.create({
      email: data.email,
      passwordHash: data.passwordHash,
      name: data.name ?? null,
    });
  }
}
