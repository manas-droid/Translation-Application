
import {db} from '../database/db.js'

export interface UserModel{
    userId:string
}


export const UserCollection = db.collection<UserModel>(process.env.USERS_COLLECTION!);