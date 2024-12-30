
import { UserCollection, UserModel } from "./users.model.js";


export async function addUser(user:UserModel){
    try{
        await UserCollection.insertOne({userId:user.userId});
    }
    catch(error:any){
        console.error("Error while adding user",error);
    }

}
