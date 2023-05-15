import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv' 
// import IUser from '../types/usermodeltypes'
dotenv.config({ path: '../../config/.env' });

const interface UserDocument extends mongoose.Document{
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candiidatePassword: string): Promise<boolean>;
}
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true},
        name: { type: String, required: true },
        password: {type: String, required: true, }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema)

export default User