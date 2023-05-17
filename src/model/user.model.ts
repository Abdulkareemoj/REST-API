import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv' 
// import IUser from '../types/usermodeltypes'
dotenv.config({ path: '../../config/.env' });

export interface IUserDocument extends mongoose.Document{
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
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

UserSchema.pre("save", async function(next: mongoose.HookNextFunction){
    // eslint-disable-next-line prefer-const
    let user = this as IUserDocument

    if (!user.isModified("password")) return next()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const salt = await bcrypt.genSalt(process.env.SALT!)

    const hash = await bcrypt.hashSync(user.password, salt)
    
    user.password = hash
    
    return next()
})

//login schema, compares plaintext password with bcrypt hashed password
UserSchema.methods.comparePassword = async function(
    candidatePassword: string){
        const user = this as IUserDocument
        return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
    }


const User = mongoose.model<IUserDocument>("User", UserSchema)

export default User