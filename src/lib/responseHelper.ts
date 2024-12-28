export class ResponseHelper{
    static success(data: unknown, message = "Success", status = 200): Response{
        return Response.json(
            {
                status,
                success: true,
                message,
                data
            },
            { status }
        )
    }
    static error(message = "An error occured", status: number, error?: Error ): Response {
        return Response.json(
            {
                status,
                success: false,
                message,
                error
            }, 
            { status }
        )
    }
}