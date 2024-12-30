import { DBconnect } from "@/lib/DBconnect"
import { ResponseHelper } from "@/lib/responseHelper"
import { verifyToken } from "@/lib/verifyToken";
import { User } from "@/models/User.models";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { email, password } = await req.json()
    if (!email || !password) {
        return ResponseHelper.error(`All fields are required`, 400)
    }

    try {
        await DBconnect();

        const directAccess = await verifyToken(email)
        if (directAccess) {
            const directUser = await User.findOne({ email }).select(
                "-password -token -verificationCode -codeExpiry -__v"
            )

            return ResponseHelper.success(directUser, "User logged in ( Cookie )", 200)
        }

        const user = await User.findOne({ email })
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const validPassword = await bcrypt.compare(password, user.password) 
        if (!validPassword) {
            return ResponseHelper.error("Invalid password", 412)
        }

        const loggedInUser = await User.findById(user._id).select(
            "-password -token -verificationCode -codeExpiry -__v"
        )

        const cookieStore = await cookies()
        cookieStore.set("token", user?.token,{
            secure: true,
            sameSite: "strict",
            httpOnly: true,
            maxAge: 172800 // 2days
        })

        return ResponseHelper.success(loggedInUser, 'User loggedIn', 200)
    } catch (error) {
        console.log(`Somthing went wrong in the login route`);
        return ResponseHelper.error(`Intrnal server error`, 500, error)
    }
}