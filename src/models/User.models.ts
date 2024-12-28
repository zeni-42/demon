// imports
import mongoose, { Document, ObjectId, Schema } from "mongoose";

// interface declaration
export interface userInterface extends Document {
    fullName: string;
    email: string;
    password: string;
    avatar: string;
    isInstructor: boolean
    verificationCode: number;
    isVerified: boolean
    codeExpiry: Date;
    token: string;
    courses: ObjectId[],
}

// Schema Declaration
export const userSchema: Schema<userInterface> = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    password:{
        type:String,
        required:true,
        index: true
    },
    avatar: {
        type: String,
    },
    isInstructor:{
        type: Boolean,
        required: true,
        default: false
    },
    verificationCode:{
        type: Number,
        required: true,
    },
    codeExpiry:{
        type: Date,
        required: true,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Courses"
        }
    ],
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    }, 
    token:{
        type: String,
    }
}, { timestamps: true })

// Model creation
export const User = 
mongoose.models.User as mongoose.Model<userInterface> || 
mongoose.model<userInterface>("User", userSchema)