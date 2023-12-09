import { NextResponse } from "next/server";
import mysqlDb from "@/lib/mysqldb";

export async function GET(){
    try {

        const [cityData] = await mysqlDb.execute(
            "SELECT * FROM fpa_country"
        );
        
        return NextResponse.json({ message: "Country List", data: cityData}, { status: 200 })

    } catch (error){
        return NextResponse.json(
            { message: "Something wrong while fetch the country data!" },
            { status: 500 }
        );
    }
 
}