import { User } from "@/models/User.models"
import { cookies } from "next/headers"
import { DBconnect } from "./DBconnect"

export async function verifyToken(email: string): Promise<boolean> {
    await DBconnect();
    const cookieStore = await cookies()
    const token = cookieStore.get('token')

    const user = await User.findOne({ email })
    if (user?.token !== token) {
        return false
    }
    return true
}