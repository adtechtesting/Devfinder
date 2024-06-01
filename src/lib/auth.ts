import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google"
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";

declare module "next-auth"{
    interface Session extends DefaultSession{
        user:{
            id:string;
        } &DefaultSession["user"]
    }
}

export const authconfig={
  adapter: PrismaAdapter(db) as Adapter,
  session:{
    strategy:"jwt"
  },
  providers: [
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID!,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      if (token.email) {
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
        });

        if (!dbUser) {
          throw new Error("No user with this email found");
        }

        token.id = dbUser.id;
        token.name = dbUser.name;
        token.image = dbUser.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.email) {
        const dbUser = await db.user.findUnique({
          where: { email: token.email },
        });

        if (dbUser) {
          session.user = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image,
          };
        }
      }

      return session;
    },
  },
}satisfies AuthOptions

export function getSession(){
    return getServerSession(authconfig)
}