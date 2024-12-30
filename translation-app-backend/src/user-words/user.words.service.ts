import { TranslationResult } from "../utils/translation.response.js";
import { UserWordsCollection } from "./user.words.model.js";
import { ErrorResponse } from "../utils/error.response.js";
import { SuccessResponse } from "../utils/success.response.js";

export async function saveTranslation(translationRes: TranslationResult, userId:string): Promise<SuccessResponse|ErrorResponse>{
    try {
        const response = await UserWordsCollection.updateOne({userId}, { $set : {userId} , $push : {savedWords : translationRes}}, {upsert:true});
        return {
            message: "Successfully added word to your dictionary",
            statusCode:200
        }
        
    } catch (error:any) {
        console.error("Upsert command failed" , error.message);
        
        const errorResponse:ErrorResponse = {
            message:"Upsert command failed",
            statusCode:500
        }
        return errorResponse 
    }

}

export async function getAllTranslations(userId:string):Promise<TranslationResult[]|undefined>{
    try{
        const response = await UserWordsCollection.findOne({userId});
        return response?.savedWords;
    }
    catch (error:any){
        console.error("Error while fetching all the words of user: ", userId, "Error: ", error.message);
    }    
    return [] as TranslationResult[];
}
