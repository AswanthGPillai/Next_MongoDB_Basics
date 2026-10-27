import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import District from "../../../models/District";


// DELETE : delete an existing data
export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const districtData = await District.findByIdAndDelete(id);

        if (!districtData) {
            return NextResponse.json({ message: "District not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "District deleted successfully", districtData });

    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: "Failed to delete district" }, { status: 500 });
    }
}



// EDIT : edit an existing data
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;

        const body = await request.formData();
        const district = body.get("district");

        const districtData = await District.findByIdAndUpdate(id, { district }, { new: true });

        if (!districtData) {
            return NextResponse.json({ message: "District not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "District updated successfully", districtData });
    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: "Failed to update district" }, { status: 500 });
    }
}