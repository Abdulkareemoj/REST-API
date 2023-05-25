import DocumentDefinition from "mongoose"
import User, {IUserDocument} from '../model/user.model'

export async function createUser(input: DocumentDefinition<IUserDocument>){
    try{
        return await User.create(input)
    }
    catch(error){
        throw new Error(error)
    }
}
function findUser(){
    try 
}