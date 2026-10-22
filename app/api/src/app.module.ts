import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaModule } from "./modules/prisma/prisma.module";
import { TokenModule } from "./modules/token/token.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AdminAuthModule } from "./modules/admin-auth/admin-auth.module";
import { ClosetModule } from "./modules/closet/closet.module";
import { ClothingModule } from "./modules/clothing/clothing.module";
import { StorageModule } from "./modules/storage/storage.module";
import { WardrobeTemplateModule } from "./modules/wardrobe-template/wardrobe-template.module";

@Module({
  imports: [
    PrismaModule,
    TokenModule,
    AuthModule,
    AdminAuthModule,
    ClosetModule,
    ClothingModule,
    StorageModule,
    WardrobeTemplateModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
