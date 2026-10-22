import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { TokenService } from "../token/token.service";
import { ADMIN_ACCESS_TOKEN_COOKIE } from "../token/token.types";
import { AdminAuthRepository } from "./admin-auth.repository";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly repository: AdminAuthRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

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

  private extractToken(request: Request): string | null {
    const cookieToken = request.cookies?.[ADMIN_ACCESS_TOKEN_COOKIE];
    if (cookieToken && typeof cookieToken === "string") {
      return cookieToken;
    }

    const rawHeaderCookie = request.headers.cookie;
    if (rawHeaderCookie) {
      const match = rawHeaderCookie
        .split(";")
        .map((c: string) => c.trim())
        .find((c: string) => c.startsWith(`${ADMIN_ACCESS_TOKEN_COOKIE}=`));
      if (match) {
        return decodeURIComponent(match.substring(ADMIN_ACCESS_TOKEN_COOKIE.length + 1));
      }
    }

    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7).trim();
    }

    return null;
  }
}
