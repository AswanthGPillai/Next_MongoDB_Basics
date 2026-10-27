import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import Place from "../../models/Place";

// POST: Insert a place
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.formData();
        const place = body.get("place");
        const districtId = body.get("districtId");
        const placeData = await Place.create({ place, districtId });
        return NextResponse.json({ message: "Place added successfully", placeData }, { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ message: "Place already exists" }, { status: 409 });
        }
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}


// GET: Fetch all places
export async function GET() {
    try {
        await connectDB();
        const placeData = await Place.find().populate("districtId");
        return NextResponse.json({ message: "Places fetched successfully", placeData }, { status: 200 });
    } catch (error) {
        console.error("Fetch places error:", error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}