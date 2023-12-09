import { COOKIE_NAME } from "@/constants";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import  { NextResponse }  from "next/server";

export async function GET(request) {
 
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  try {
    
    const payload = verify(value, secret);
    
    const response = {
      userItsId: payload.itsId,
      message: 'User Logged Successfully',
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });

  } catch (e) {
    
      //for web
      return NextResponse.redirect(new URL('/', request.url));

      //for Api
      //return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })

  }
}
