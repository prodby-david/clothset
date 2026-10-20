import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { TokenModule } from "./modules/token/token.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [PrismaModule, TokenModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
