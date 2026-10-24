import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { TokenModule } from "../token/token.module";
import { AdminAuthRepository } from "./admin-auth.repository";
import { AdminAuthService } from "./admin-auth.service";
import { AdminAuthController } from "./admin-auth.controller";
import { AdminAuthGuard } from "../../common/guards/admin-auth.guard";

@Module({
  imports: [PrismaModule, TokenModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthRepository, AdminAuthService, AdminAuthGuard],
  exports: [AdminAuthService, AdminAuthGuard, AdminAuthRepository],
})
export class AdminAuthModule {}
