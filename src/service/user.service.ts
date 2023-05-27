import DocumentDefinition from "mongoose"
import User, {IUserDocument} from '../model/user.model'
import { omit } from "lodash"

export async function createUser(input: DocumentDefinition<IUserDocument>){
    try{
        return await User.create(input)
    }
    catch(error){
        throw new Error(error)
    }
}
function findUser() {}

export async function validatePassword({
    email,
     password,
}: {
   email: IUserDocument["email"]
   password: string


})
{

    const user = await User.findOne({email})
    if (!user){
        return false
    }
    const isValid = await user.comparePassword(password)
    if (!isValid){
        return false
    }
    return omit(user.toJSON(), "password")
}