import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import District from "../../models/District";



// POST: Insert a district
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.formData();  
        const district = body.get("district");

        const districtData = await District.create({ district });

        return NextResponse.json({ message: "District added successfully", districtData }, { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ message: "District already exists" }, { status: 409 });
        }

        console.error("Create district error:", error);

        return NextResponse.json({ message: "Failed to create district" }, { status: 500 }
        );
    }
}



// GET: Fetch all districts
export async function GET() {
    try {
        await connectDB();

        const districtData = await District.find();

        return NextResponse.json({ message: "Districts fetched successfully", districtData }, { status: 200 });
    } catch (error) {
        
        console.error("Fetch districts error:", error);
        return NextResponse.json({ message: "Failed to fetch districts" }, { status: 500 });
    }
}
