// Imports
import mongoose, { Document, ObjectId, Schema } from "mongoose";

// interface declaration
export interface videoInterface extends Document {
    filename: string;
    duration: number;
    uploadedBy: ObjectId;
    belongsTo: ObjectId
}

// Schema Declaration
export const videoSchema:Schema<videoInterface> = new mongoose.Schema({
    filename:{
        type: String,
        required: true,
        index: true,
        unique: true
    },
    duration:{
        type: Number,
        required: true,
        index: true
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