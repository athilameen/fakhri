import { COOKIE_NAME } from "./constants";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // console.log(request.method);
  // console.log(request.url);

  const cookie = req.cookies.get(COOKIE_NAME);
  if (cookie) {
    if (
      cookie.value &&
      (req.nextUrl.pathname.startsWith("/user") ||
        req.nextUrl.pathname.startsWith("/professional") ||
        req.nextUrl.pathname.startsWith("/achievement") ||
        req.nextUrl.pathname.startsWith("/user/maulana"))
    ) {
      return NextResponse.next();
    }

    // if (
    //   cookie.value && req.nextUrl.pathname.startsWith("/")
    // ) {
    //   //return NextResponse.next();
    //   return NextResponse.redirect(new URL('/user', req.url))
   // }

  }

  
  //return NextResponse.next();
  return NextResponse.redirect(new URL('/', req.url))
}

export const config = {
  //matcher: "/",
  matcher: "/user/:path*",
};
