import NextAuth, { NextAuthConfig } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/db";
import { authSchema } from "@/lib/validations";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const parsedCredentials = authSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          console.log("Invalid credentials format", parsedCredentials.error);
          return null;
        }

        const { email, password } = parsedCredentials.data;
        
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const passwordIsValid = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordIsValid) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
          // { id: user.id,
          // email: user.email, }
      },
    }),
  ],
  callbacks: {
    // authorized: ({request}) => {
    //   const isTryingToAccessApp = request.nextUrl.pathname.startsWith("/app");

    //   if (isTryingToAccessApp) {
    //     return !!request.headers.get("authorization");
    //   }
    //   return true;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = String(token.sub); // was user.id and token.sub
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  handlers: { GET, POST },
} = NextAuth(authOptions);