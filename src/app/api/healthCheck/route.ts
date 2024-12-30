import { ResponseHelper } from "@/lib/responseHelper";

export async function GET() {
    try {
        return ResponseHelper.success({}, `Server is working properly`, 200)
    } catch (error) {
        console.log(`Somthing went wrong in healthCheck route`)
        return ResponseHelper.error(`Server is not wroking properly`, 500, error)
    }
}