import { COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {

  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);

  return NextResponse.json(
    {
      message: "Logout Successfully",
    },
    {
      status: 200,
    }
  );

}
