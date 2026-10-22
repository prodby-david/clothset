import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { TokenModule } from "../token/token.module";
import { AdminAuthModule } from "../admin-auth/admin-auth.module";
import { WardrobeTemplateRepository } from "./wardrobe-template.repository";
import { WardrobeTemplateService } from "./wardrobe-template.service";
import { WardrobeTemplateController } from "./wardrobe-template.controller";

@Module({
  imports: [PrismaModule, TokenModule, AdminAuthModule],
  controllers: [WardrobeTemplateController],
  providers: [WardrobeTemplateRepository, WardrobeTemplateService],
  exports: [WardrobeTemplateService, WardrobeTemplateRepository],
})
export class WardrobeTemplateModule {}
