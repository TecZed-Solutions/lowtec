import { decodeJwt } from "jose";
import { NextResponse, type NextRequest } from "next/server";

function sessaoValida(token: string | undefined) {
  if (!token) return false;

  try {
    const { id, exp } = decodeJwt(token);
    return (
      typeof id === "string" && (exp === undefined || exp * 1000 > Date.now())
    );
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  if (!sessaoValida(request.cookies.get("JWT_USUARIO")?.value)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/perfil/:path*"],
};
