// Imports
import mongoose, { Document, ObjectId, Schema } from "mongoose";

// interface declaration
export interface videoInterface extends Document {
    title: string;
    duration: number;
    description: string;
    isPrivate: boolean;
    uploadedBy: ObjectId;
    belongsTo: ObjectId
}

// Schema Declaration
export const videoSchema:Schema<videoInterface> = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        index: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        max: 200
    },
    duration:{
        type: Number,
        required: true,
        index: true
    },
    isPrivate:{
        type: Boolean,
        required: true,
        default: false
    },
    uploadedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }
}, { timestamps: true })

// Model creation
export const Video =
mongoose.models.Video as mongoose.Model<videoInterface> ||
mongoose.model<videoInterface>("Video", videoSchema)