import { NextResponse } from "next/server";
import mysqlDb from "@/lib/mysqldb";

export async function GET(){
    try {

        const [cityData] = await mysqlDb.execute(
            "SELECT * FROM fpa_city"
        );
        
        return NextResponse.json({ message: "City List", data: cityData}, { status: 200 })

    } catch (error){
        return NextResponse.json(
            { message: "Something wrong while fetch the city data!" },
            { status: 500 }
        );
    }
 
}