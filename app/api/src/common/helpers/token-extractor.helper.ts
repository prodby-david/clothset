import type { Request } from "express";

export function extractCookieOrBearerToken(
  request: Request,
  cookieName: string,
): string | null {
  const cookieToken = request.cookies?.[cookieName];
  if (cookieToken && typeof cookieToken === "string") {
    return cookieToken;
  }

  const rawHeaderCookie = request.headers.cookie;
  if (rawHeaderCookie) {
    const match = rawHeaderCookie
      .split(";")
      .map((c: string) => c.trim())
      .find((c: string) => c.startsWith(`${cookieName}=`));
    if (match) {
      return decodeURIComponent(match.substring(cookieName.length + 1));
    }
  }

  const authHeader = request.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  return null;
}
