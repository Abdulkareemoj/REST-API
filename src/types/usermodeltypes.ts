import mongoose from "mongoose";

 interface UserDocument extends mongoose.Document{
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candiidatePassword: string): Promise<boolean>;
}

export default UserDocument