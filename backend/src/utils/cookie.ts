import type { CookieOptions, Response } from "express";

export const sessionUserCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  ...(process.env.NODE_ENV === "production" && {
    domain: ".lowtec.com.br",
  }),
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const sessionAdminCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  ...(process.env.NODE_ENV === "production" && {
    domain: ".lowtec.com.br",
  }),
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
};

export function clearSessionCookie(
  res: Response,
  name: "JWT_USUARIO" | "JWT_ADMIN",
  options: CookieOptions,
) {
  const clearOptions = { ...options };
  delete clearOptions.maxAge;
  delete clearOptions.expires;

  res.clearCookie(name, clearOptions);

  // Remove tambem cookies antigos criados apenas para o host da API.
  if (clearOptions.domain) {
    delete clearOptions.domain;
    res.clearCookie(name, clearOptions);
  }
}
