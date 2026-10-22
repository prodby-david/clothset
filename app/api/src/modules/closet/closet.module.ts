import { Module } from "@nestjs/common";
import { ClosetController } from "./closet.controller";
import { ClosetService } from "./closet.service";
import { ClosetRepository } from "./closet.repository";
import { PrismaModule } from "../prisma/prisma.module";
import { TokenModule } from "../token/token.module";
import { AuthModule } from "../auth/auth.module";
import { WardrobeTemplateModule } from "../wardrobe-template/wardrobe-template.module";

@Module({
  imports: [PrismaModule, TokenModule, AuthModule, WardrobeTemplateModule],
  controllers: [ClosetController],
  providers: [ClosetRepository, ClosetService],
  exports: [ClosetRepository, ClosetService],
})
export class ClosetModule {}
