import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { TokenService } from "../../modules/token/token.service";
import { ACCESS_TOKEN_COOKIE } from "../../modules/token/token.types";
import { extractCookieOrBearerToken } from "../helpers/token-extractor.helper";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = extractCookieOrBearerToken(request, ACCESS_TOKEN_COOKIE);

    if (!token) {
      throw new UnauthorizedException("Authentication token is missing");
    }

    const payload = await this.tokenService.verifyAccessToken(token);

    (
      request as Request & { user: { id: string; email: string; plan: string } }
    ).user = {
      id: payload.sub,
      email: payload.email,
      plan: payload.plan,
    };

    return true;
  }
}
