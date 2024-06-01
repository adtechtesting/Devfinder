import NextAuth from "next-auth"
import { authconfig } from "@/lib/auth"
 const handler  = NextAuth(authconfig)

export { handler as GET, handler as POST }