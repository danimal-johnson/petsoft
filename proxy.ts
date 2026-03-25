import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export default NextAuth(authOptions).auth;

export const config = {
  matcher: ["/app/:path*"],
};
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
