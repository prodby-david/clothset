import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { CookieOptions } from "express";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ADMIN_ACCESS_TOKEN_COOKIE,
} from "./token.types";
import type {
  JwtPayload,
  AdminJwtPayload,
  AuthenticatedUser,
  AuthenticatedAdmin,
  TokenPair,
} from "./token.types";

@Injectable()
export class TokenService {
  private readonly jwtSecret: string;
  private readonly adminJwtSecret: string;
  private readonly isProduction: boolean;

  constructor(private readonly jwtService: JwtService) {
    this.jwtSecret = process.env.JWT_SECRET || "clothset-dev-secret-key-change-in-production";
    this.adminJwtSecret = process.env.ADMIN_JWT_SECRET || this.jwtSecret;
    this.isProduction = process.env.NODE_ENV === "production";
  }

  async generateTokens(user: AuthenticatedUser): Promise<TokenPair> {
    const accessPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      plan: user.plan,
      type: "access",
    };

    const refreshPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      plan: user.plan,
      type: "refresh",
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: this.jwtSecret,
        expiresIn: "1d",
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: this.jwtSecret,
        expiresIn: "7d",
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAdminToken(admin: AuthenticatedAdmin): Promise<string> {
    const payload: AdminJwtPayload = {
      sub: admin.id,
      email: admin.email,
      type: "admin",
    };

    return this.jwtService.signAsync(payload, {
      secret: this.adminJwtSecret,
      expiresIn: "1d",
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtSecret,
      });

      if (payload.type !== "access") {
        throw new UnauthorizedException("Invalid token type");
      }

      return payload;
    } catch {
      throw new UnauthorizedException("Invalid or expired access token");
    }
  }

  async verifyAdminToken(token: string): Promise<AdminJwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<AdminJwtPayload>(token, {
        secret: this.adminJwtSecret,
      });

      if (payload.type !== "admin") {
        throw new UnauthorizedException("Invalid administrative token");
      }

      return payload;
    } catch {
      throw new UnauthorizedException("Invalid or expired administrative token");
    }
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtSecret,
      });

      if (payload.type !== "refresh") {
        throw new UnauthorizedException("Invalid token type");
      }

      return payload;
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
  }

  getAccessTokenCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    };
  }

  getAdminAccessTokenCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    };
  }

  getRefreshTokenCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }

  getClearCookieOptions(): CookieOptions {
    return {
      httpOnly: true,
      secure: this.isProduction,
      sameSite: "lax",
      path: "/",
    };
  }
}
