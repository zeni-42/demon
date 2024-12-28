import mongoose from "mongoose";
import { MONGODBNAME } from "./constants";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {};

export async function DBconnect(): Promise<void>{
    if (connection.isConnected) {
        console.log(`MONGODB EXIST`);
        return;
    }

    try {
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${MONGODBNAME}`, {})
        connection.isConnected = db.connections[0].readyState;
        console.log(connection.isConnected);
        console.log(`MONGODB CONNECTED`)

    } catch (error) {
        console.log(`MONGODB FAILED`);
        process.exit(1);
    }
}