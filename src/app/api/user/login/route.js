import { NextResponse } from "next/server";
import mysqlDb from "@/lib/mysqldb";

export async function GET(){

    try {

        
        const [userData] = await mysqlDb.execute("SELECT id_user, email, its_id FROM fpa_user WHERE its_id=20389950 ");

        if(userData.length === 0){

            const [newUserData] = await mysqlDb.execute("INSERT INTO fpa_user (id_group, email, its_id, status, created_at, updated_at, activated_at, professional) VALUES (2, '', 12345678, 1, 1699971826, 1699971826, 1699971826, 1); ");
            
            if(newUserData.length === 0){
                return NextResponse.json(
                    { message: "An error occurred while create the user." },
                    { status: 500 }
                );
            } else {
                return NextResponse.json({ message: "New user created.", data: newUserData}, { status: 201 });
            }

        } else {
            console.log(userData[0].email);
            return NextResponse.json({ message: "Existing user.", data: userData}, { status: 200 });
        }

    } catch (error){
        return NextResponse.json(
            { message: "An error occurred while logging the user." },
            { status: 500 }
        );
    }
 
}