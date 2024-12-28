import { DBconnect } from "@/lib/DBconnect"
import { ResponseHelper } from "@/lib/responseHelper"
import { User } from "@/models/User.models";

export async function POST(req: Request) {
    const { userId } = await req.json()
    if(!userId){
        return ResponseHelper.error(`All fields are required`, 400)
    }

    try {
        await DBconnect();

        const user = await User.findById(userId)
        if(!user) return ResponseHelper.error(`User not found`, 404)

        await user.updateOne(
            { _id: userId },
            {
                $unset:{ token: 1 },
                $set: { new: true }
            }
        )
        await user.save();
        return ResponseHelper.success({},`User logged out`, 200)

    } catch (error) {
        console.log(`Somthing went wrong in the logout route | ${error}`);
        return ResponseHelper.error(`Internal server error`, 500, error)
    }
}