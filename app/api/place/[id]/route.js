import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Place from "../../../models/Place";

// DELETE : delete an existing data
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const placeData = await Place.findByIdAndDelete(id);
        if (!placeData) {
            return NextResponse.json({ message: "Place not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Place deleted successfully", placeData });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to delete place" }, { status: 500 });
    }
}



// EDIT : edit an existing data
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.formData();
        const place = body.get("place");
        const districtId = body.get("districtId");
        const placeData = await Place.findByIdAndUpdate(id, { place, districtId }, { new: true });
        if (!placeData) {
            return NextResponse.json({ message: "Place not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Place updated successfully", placeData });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to update place" }, { status: 500 });
    }

}