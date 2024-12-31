import { User } from "@/models/User.models"
import { cookies } from "next/headers"
import { DBconnect } from "./DBconnect"

export async function verifyToken(email: string): Promise<boolean> {
    await DBconnect();
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    if (!token) {
        return false
    }
    const optionalTokenValue = token?.value

    const user = await User.findOne({ email, token: optionalTokenValue })
    if (!user) {
        return false
    }
    return true
}