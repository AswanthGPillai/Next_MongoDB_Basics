import connectDB from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        await connectDB()

        const formData = await request.formData()
        const email = formData.get("email")
        const password = formData.get("password")
        const userData = await User.findOne({ email, password })

        if (userData) {
            return NextResponse.json({ 'msg': 'Login Successfully...', 'userData': userData })
        }
        return NextResponse.json({ 'msg': 'Invalid Credendials...' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ 'msg': 'Login Failed...' })

    }

}