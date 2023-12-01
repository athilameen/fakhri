import { NextResponse } from "next/server";
import mysqlDb from "@/lib/mysqldb";


export async function GET(){
    try {

        const [userData] = await mysqlDb.execute(
            "SELECT id_user, email, its_id FROM fpa_user WHERE its_id=20389950 "
        );
        
        //return new Response('ok')
        return NextResponse.json({ message: "User Data", data: userData}, { status: 200 })
       // return NextResponse.json({ message: "User Data", data: userData}, { status: 200 });

    } catch (error){
        return NextResponse.json(
            { message: "Something wrong while fetch the data!" },
            { status: 500 }
        );
    }
 
}