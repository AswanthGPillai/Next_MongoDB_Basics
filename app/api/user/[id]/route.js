import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";
import fs from "fs/promises";
import path from "path";

// GET - Get single user data

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const userData = await User.findById(id).populate({ path: 'placeId', populate: { path: 'districtId' } });
        return NextResponse.json({ msg: "User fetched successfully", userData: userData }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ msg: "Failed to fetch user" }, { status: 500 });
    }
}





// EDIT - user details

export async function PUT(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;
        const formData = await request.formData();

        const photo = formData.get("photo");

        let updatedData = {
            name: formData.get("name"),
            email: formData.get("email"),
            address: formData.get("address"),
            contact: formData.get("contact"),
            placeId: formData.get("placeId"),
        };

        if (photo && typeof photo !== "string" && photo.size > 0) {
            const bytes = await photo.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = Date.now() + photo.name;
            const uploadPath = path.join(process.cwd(), "public/uploads");

            await fs.mkdir(uploadPath, { recursive: true });
            await fs.writeFile(path.join(uploadPath, fileName), buffer);

            updatedData.photo = "/uploads/" + fileName;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        return NextResponse.json({ msg: "User updated successfully", userData: updatedUser }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Failed to update user" }, { status: 500 });
    }
}






//EDIT - Change Password

export async function PATCH(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const formData = await request.formData();
        const oldPassword = formData.get("oldPassword");
        const newPassword = formData.get("newPassword");

        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        if (user.password !== oldPassword) {
            return NextResponse.json({ msg: "Old password is incorrect" }, { status: 400 });
        }

        user.password = newPassword;
        await user.save();
        return NextResponse.json({ msg: "Password updated successfully" }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Failed to update password" }, { status: 500 });
    }
}





// DELETE - Delete user

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const userData = await User.findByIdAndDelete(id);
        return NextResponse.json({ msg: "User deleted successfully", userData: userData }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: "Failed to delete user" }, { status: 500 });
    }
}
