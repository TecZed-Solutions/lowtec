import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

function tokenUsuario(response: Response) {
  for (const cookie of response.headers.getSetCookie()) {
    const token = /^JWT_USUARIO=([^;]+)/.exec(cookie)?.[1];
    if (token) return token;
  }

  return null;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60,
  },

  pages: {
    signIn: "/entrar/google",
    error: "/entrar/google",
  },

  callbacks: {
    async signIn({ account }) {
      if (account?.provider !== "google" || !account.id_token) {
        return "/entrar/google?erro=google";
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usuario/login-google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              credential: account.id_token,
            }),
          },
        );

        if (response.status === 409) {
          return "/entrar/google?erro=conta-local";
        }

        const token = response.ok ? tokenUsuario(response) : null;

        if (!token) {
          return "/entrar/google?erro=backend";
        }

        (await cookies()).set("JWT_USUARIO", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          ...(process.env.NODE_ENV === "production" && {
            domain: ".lowtec.com.br",
          }),
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return true;
      } catch (error) {
        console.error("Erro ao autenticar com o Google no backend:", error);
        return "/entrar/google?erro=backend";
      }
    },
  },
});

export { handler as GET, handler as POST };
