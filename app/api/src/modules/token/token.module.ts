import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TokenService } from "./token.service";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || "clothset-dev-secret-key-change-in-production",
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
