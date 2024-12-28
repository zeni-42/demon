// Imports
import mongoose, { Document, ObjectId, Schema } from "mongoose";

// interface declaration
export interface courseInterface extends Document {
    name: string;
    descrpition: string;
    price: number;
    coverImage: string;
    createdBy: ObjectId;
    duration: number;
    category: string
    videos: ObjectId[]
}

// Schema Declaration
export const courseSchema:Schema<courseInterface> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        max: 150
    },
    descrpition: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        index: true,
    },
    coverImage: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    duration:{
        type: Number,
        index: true,
        required: true,
    },
    category:{
        type:String,
    },
    videos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }]
}, { timestamps: true })

// Model creation
export const Course = 
mongoose.models.Course as mongoose.Model<courseInterface>  || 
mongoose.model<courseInterface>("Course", courseSchema)