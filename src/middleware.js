import { COOKIE_NAME } from "./constants";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // console.log(request.method);
  // console.log(request.url);

  const pathname = req.nextUrl.pathname;
  const protectedPaths = [
    "/profile",
    "/user",
    "/user/professional",
    "/user/achievement",
    "/user/maulana",
    "/directory",
    "/about",
    "/event",
    "/careervideos",
    "/videos",
    "/contact",
  ];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = NextResponse.next();
  if (isPathProtected) {
    const cookie = req.cookies.get(COOKIE_NAME);
    if (!cookie) {
      const url = new URL(`/`, req.url);
      //url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return res;
}
