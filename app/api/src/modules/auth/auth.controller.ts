import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  UseGuards,
  UsePipes,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { signInSchema, signUpSchema } from "@clothset/shared-schemas";
import type { SignInInput, SignUpInput } from "@clothset/shared-schemas";
import { AuthService } from "./auth.service";
import { TokenService } from "../token/token.service";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "../token/token.types";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUserId } from "../../common/decorators/current-user.decorator";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post(["signup", "register"])
  @UsePipes(new ZodValidationPipe(signUpSchema))
  async signUp(
    @Body() body: SignUpInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signUp(body);

    res.cookie(
      ACCESS_TOKEN_COOKIE,
      result.tokens.accessToken,
      this.tokenService.getAccessTokenCookieOptions(),
    );
    res.cookie(
      REFRESH_TOKEN_COOKIE,
      result.tokens.refreshToken,
      this.tokenService.getRefreshTokenCookieOptions(),
    );

    return {
      user: result.user,
      accessToken: result.tokens.accessToken,
    };
  }

  @Post(["signin", "login"])
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(signInSchema))
  async signIn(
    @Body() body: SignInInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(body);

    res.cookie(
      ACCESS_TOKEN_COOKIE,
      result.tokens.accessToken,
      this.tokenService.getAccessTokenCookieOptions(),
    );
    res.cookie(
      REFRESH_TOKEN_COOKIE,
      result.tokens.refreshToken,
      this.tokenService.getRefreshTokenCookieOptions(),
    );

    return {
      user: result.user,
      accessToken: result.tokens.accessToken,
    };
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Body("refreshToken") bodyToken: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    const rawCookie = req.cookies?.[REFRESH_TOKEN_COOKIE];
    const token = rawCookie || bodyToken;

    if (!token) {
      throw new UnauthorizedException("Refresh token is missing");
    }

    const result = await this.authService.refresh(token);

    res.cookie(
      ACCESS_TOKEN_COOKIE,
      result.tokens.accessToken,
      this.tokenService.getAccessTokenCookieOptions(),
    );
    res.cookie(
      REFRESH_TOKEN_COOKIE,
      result.tokens.refreshToken,
      this.tokenService.getRefreshTokenCookieOptions(),
    );

    return {
      user: result.user,
      accessToken: result.tokens.accessToken,
    };
  }

  @Post(["signout", "logout"])
  @HttpCode(HttpStatus.OK)
  async signOut(@Res({ passthrough: true }) res: Response) {
    const clearOptions = this.tokenService.getClearCookieOptions();
    res.clearCookie(ACCESS_TOKEN_COOKIE, clearOptions);
    res.clearCookie(REFRESH_TOKEN_COOKIE, clearOptions);

    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async getCurrentUserProfile(@CurrentUserId() userId: string) {
    return this.authService.getCurrentUserProfile(userId);
  }
}
