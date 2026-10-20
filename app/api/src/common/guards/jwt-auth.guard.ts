import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { TokenService } from "../../modules/token/token.service";
import { ACCESS_TOKEN_COOKIE } from "../../modules/token/token.types";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("Authentication token is missing");
    }

    const payload = await this.tokenService.verifyAccessToken(token);

    (request as Request & { user: { id: string; email: string; plan: string } }).user = {
      id: payload.sub,
      email: payload.email,
      plan: payload.plan,
    };

    return true;
  }

  private extractToken(request: Request): string | null {
    const cookieToken = request.cookies?.[ACCESS_TOKEN_COOKIE];
    if (cookieToken && typeof cookieToken === "string") {
      return cookieToken;
    }

    const rawHeaderCookie = request.headers.cookie;
    if (rawHeaderCookie) {
      const match = rawHeaderCookie
        .split(";")
        .map((c: string) => c.trim())
        .find((c: string) => c.startsWith(`${ACCESS_TOKEN_COOKIE}=`));
      if (match) {
        return decodeURIComponent(match.substring(ACCESS_TOKEN_COOKIE.length + 1));
      }
    }

    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7).trim();
    }

    return null;
  }
}
