import { COOKIE_NAME } from "@/constants";
import { MAX_AGE } from "@/constants";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request){

    const body = await request.json();
    const { itsId } = body;

    if (!itsId) {
        return NextResponse.json(
          {
            message: "Unauthorized",
          },
          {
            status: 401,
          }
        );
      }

    // Always check this
    const secret = process.env.JWT_SECRET || "";

    const token = sign(
      {
        itsId,
      },
      secret,
      {
        expiresIn: MAX_AGE,
      }
    );

    const seralized = serialize(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/",
      });

    const response = {
        message: "Authenticated!",
      };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: { "Set-Cookie": seralized },
    });
 
}