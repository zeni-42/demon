import { DBconnect } from "@/lib/DBconnect"
import { ResponseHelper } from "@/lib/responseHelper"
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
        const user = await User.findOne({ email })
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const validPassword = await bcrypt.compare(password, user.password) 
        if (!validPassword) {
            return ResponseHelper.error("Invalid password", 412)
        }

        const secret = process.env.TOKEN_SECRET
        if (!secret) {
            throw new Error("Token is missing")
        }

        const token = jwt.sign(
            {
                id: user._id,
                password: user.password
            },
            secret,
            {
                expiresIn: process.env.TOKEN_EXPIRY
            }
        )
        // if (!token) {
        //     throw new Error("Failed to generate token")
        // }
        if (!token) throw new Error("Fialed to generate token")

        user.token = token;
        await user.save();

        const loggedInUser = await User.findById(user._id).select(
            "-password -token -verificationCode -codeExpiry -__v"
        )

        return ResponseHelper.success(loggedInUser, 'User loggedIn', 200)
    } catch (error) {
        console.log(`Somthing went wrong in the login route`);
        return ResponseHelper.error(`Intrnal server error`, 500, error)
    }
}