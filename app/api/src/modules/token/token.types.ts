export const ACCESS_TOKEN_COOKIE = "clothset_token";
export const REFRESH_TOKEN_COOKIE = "clothset_refresh_token";
export const ADMIN_ACCESS_TOKEN_COOKIE = "clothset_admin_token";

export interface JwtPayload {
  sub: string;
  email: string;
  plan: string;
  type: "access" | "refresh";
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  plan: string;
}

export interface AdminJwtPayload {
  sub: string;
  email: string;
  type: "admin";
}

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  name: string | null;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
