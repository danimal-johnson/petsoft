import { NextResponse } from "next/server";


export function proxy(request: Request) {
  request.headers.set("X-Forwarded-For", "<IP_ADDRESS>");
  console.log(request.url);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};