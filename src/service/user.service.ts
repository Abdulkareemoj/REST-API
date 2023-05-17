import {DocumentDefinition} from 'mongoose'
import User, {IUserDocument} from '../model/user.model'

export async function createUser(input: DocumentDefinintion<UserDocument>){
    try{
        return await User.create(input)
    }
    catch(errror){
        throw new Error(error)
    }
}
function findUser(){
    try 
}