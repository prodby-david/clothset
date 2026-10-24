import type { ExecutionContext } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common";
import type { AuthenticatedAdmin } from "../../modules/token/token.types";

export const CurrentAdmin = createParamDecorator(
  (data: keyof AuthenticatedAdmin | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const admin = request.admin as AuthenticatedAdmin | undefined;

    if (!admin) {
      return null;
    }

    if (data) {
      return admin[data];
    }

    return admin;
  },
);

export const CurrentAdminId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const admin = request.admin as AuthenticatedAdmin | undefined;
    return admin?.id ?? null;
  },
);
