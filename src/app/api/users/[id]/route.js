import { NextRequest, NextResponse } from "next/server";
import mysqlDb from "@/lib/mysqldb"

export async function POST(req, {params}) {

  const itsId = params.id;
  const {profileData} = await req.json();
  const { email } = profileData;

  try {

    const userUpdate = await mysqlDb.query(
      `UPDATE fpa_user SET email="${email}" WHERE its_id=${itsId}`
    )

    if(userUpdate){
      return NextResponse.json(
        { message: "User data updated successfully" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "User data couldn't update", data: [] },
        { status: 204 }
      );
    }
    
  } catch (error) {
    return NextResponse.json(
      { message: "Something wrong while update the user data!" },
      { status: 500 }
    );

  }
  

}


export async function GET(req, { params }) {

  const itsId = params.id;

  try {
    const [userData] = await mysqlDb.execute(
      `SELECT id_user, email, its_id FROM fpa_user WHERE its_id=${itsId}`
    );

    if(userData[0]){
      return NextResponse.json(
        { message: "User data found", data: userData[0] },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "User data not Found!", data: [] },
        { status: 404 }
      );
    }
    
  } catch (error) {
    return NextResponse.json(
      { message: "Something wrong while fetch the user data!" },
      { status: 500 }
    );
  }
}