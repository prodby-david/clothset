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
} from "@nestjs/common";
import type { Request, Response } from "express";
import { adminSignInSchema } from "@clothset/shared-schemas";
import type { AdminSignInInput } from "@clothset/shared-schemas";
import { AdminAuthService } from "./admin-auth.service";
import { TokenService } from "../token/token.service";
import { ADMIN_ACCESS_TOKEN_COOKIE } from "../token/token.types";
import { AdminAuthGuard } from "./admin-auth.guard";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";

@Controller("admin/auth")
export class AdminAuthController {
  constructor(
    private readonly service: AdminAuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(adminSignInSchema))
  async login(
    @Body() body: AdminSignInInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.service.signIn(body);

    res.cookie(
      ADMIN_ACCESS_TOKEN_COOKIE,
      result.token,
      this.tokenService.getAdminAccessTokenCookieOptions(),
    );

    return {
      admin: result.admin,
      token: result.token,
    };
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    const clearOptions = this.tokenService.getClearCookieOptions();
    res.clearCookie(ADMIN_ACCESS_TOKEN_COOKIE, clearOptions);
    return { success: true };
  }

  @Get("me")
  @UseGuards(AdminAuthGuard)
  async getMe(@Req() req: Request & { admin: { id: string; email: string; name: string | null } }) {
    return req.admin;
  }
}
