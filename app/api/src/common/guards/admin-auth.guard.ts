import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { TokenService } from "../../modules/token/token.service";
import { ADMIN_ACCESS_TOKEN_COOKIE } from "../../modules/token/token.types";
import { AdminAuthRepository } from "../../modules/admin-auth/admin-auth.repository";
import { extractCookieOrBearerToken } from "../helpers/token-extractor.helper";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly repository: AdminAuthRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = extractCookieOrBearerToken(request, ADMIN_ACCESS_TOKEN_COOKIE);

    if (!token) {
      throw new UnauthorizedException("Administrative authentication token is missing");
    }

    const payload = await this.tokenService.verifyAdminToken(token);
    const admin = await this.repository.findById(payload.sub);

    if (!admin) {
      throw new UnauthorizedException("Administrator account not found or disabled");
    }

    (request as Request & { admin: { id: string; email: string; name: string | null } }).admin = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
    };

    return true;
  }
}
