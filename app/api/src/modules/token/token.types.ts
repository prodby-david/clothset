export const ACCESS_TOKEN_COOKIE = "clothset_token";
export const REFRESH_TOKEN_COOKIE = "clothset_refresh_token";

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

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
