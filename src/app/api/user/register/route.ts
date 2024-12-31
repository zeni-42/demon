import { DBconnect } from "@/lib/DBconnect"
import { ResponseHelper } from "@/lib/responseHelper"
import { User } from "@/models/User.models"
import bcrypt  from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: Request){
    const { fullName, email, password } = await req.json();
    if (!fullName || !email ||  !password) {
        return ResponseHelper.error("All fields are required", 400)
    }

    try {
        await DBconnect();

        const existingUser = await User.findOne(
            { email },
        )
        if (existingUser) {
            return ResponseHelper.error("This email is taken", 410)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationCode = Math.floor(Math.random() * 10000)
        const expiryTime = new Date(Date.now() + 3600000)

        const secret = process.env.TOKEN_SECRET
        if (!secret) {
            throw new Error("Token is missing")
        }

        const token = jwt.sign(
            {
                fullName,
                email,
                hashedPassword
            },
            secret,
            {
                expiresIn: process.env.TOKEN_EXPIRY
            }
        )
        if (!token) throw new Error("Failed to generate token")
        
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            verificationCode,
            codeExpiry: expiryTime,
            token
        })
        if (!user) {
            return ResponseHelper.error(`Failed to register`, 405)
        }

        const createdUser = await User.findById(user._id).select(
            "-password -token -verificationCode -codeExpiry -__v"
        )

        return ResponseHelper.success(createdUser,`User Registered`,200)

    } catch (error) {
        console.log(`Somthing went wrong in register route`)
        return ResponseHelper.error("Internal server error", 500, error)
    }
}