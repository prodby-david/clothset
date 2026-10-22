import { Module } from "@nestjs/common";
import { ClothingController } from "./clothing.controller";
import { ClothingService } from "./clothing.service";
import { ClothingRepository } from "./clothing.repository";
import { PrismaModule } from "../prisma/prisma.module";
import { TokenModule } from "../token/token.module";
import { ClosetModule } from "../closet/closet.module";

@Module({
  imports: [PrismaModule, TokenModule, ClosetModule],
  controllers: [ClothingController],
  providers: [ClothingRepository, ClothingService],
  exports: [ClothingRepository, ClothingService],
})
export class ClothingModule {}
