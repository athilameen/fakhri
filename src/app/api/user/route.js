import { NextResponse } from "next/server";
import mysqlDb from "@/lib/mysqldb";


export async function GET(){



    // try {
    //     const [userData] = await mysqlDb.execute("SELECT id_user, email, its_id FROM fpa_user WHERE its_id=203899501 ");
    //     return NextResponse.json({ message: "Existing user.", data: userData}, { status: 200 });
    // } catch (error){
    //     return NextResponse.json(
    //         { message: "An error occurred while logging the user." },
    //         { status: 500 }
    //     );
    // }


    const [rows, fields] = await mysqlDb.execute("SELECT id_user, email FROM fpa_user LIMIT 600 ");
    return NextResponse.json({ message: "User registered.", data: rows }, { status: 200 });
 
}