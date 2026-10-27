
import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import User from "../../models/User";
import fs from "fs/promises";
import path from "path";


// POST: Register a new user

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();

        const photo = formData.get("photo");

        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileName = Date.now() + photo.name;
        const uploadPath = path.join(process.cwd(), "public/uploads");

        await fs.mkdir(uploadPath, { recursive: true });

        await fs.writeFile(path.join(uploadPath, fileName), buffer);

        const user = await User.create({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            address: formData.get("address"),
            contact: formData.get("contact"),
            placeId: formData.get("placeId"),
            photo: "/uploads/" + fileName,
        });

        return NextResponse.json({ msg: "User Registration Successful", userData: user, }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ msg: "Registration Failed" }, { status: 500 });
    }
}






//GET - Fetch all users

export async function GET() {
    try {
        await connectDB();
        const users = await User.find().populate({path:"placeId",populate:{path:"districtId"}});
        return NextResponse.json({ msg: "Users fetched successfully", userData: users }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ msg: "Failed to fetch users" }, { status: 500 });
    }
}