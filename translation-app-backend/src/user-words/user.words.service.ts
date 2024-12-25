import { TranslationResult } from "../utils/translation.response.js";
import { UserWordsCollection } from "./user.words.model.js";
import { ErrorResponse } from "../utils/error.response.js";
import { SuccessResponse } from "../utils/success.response.js";

export async function saveTranslation(translationRes: TranslationResult, userId:string = "tempId"): Promise<SuccessResponse|ErrorResponse>{

    try {
        console.log(translationRes)
        const response = await UserWordsCollection.updateOne({userId}, { $set : {userId} , $push : {savedWords : translationRes}}, {upsert:true});
        console.log("Upset Command Successful!" , response);

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

function getAllTranslations(userId:string = "tempId"):TranslationResult[]{
    
    return [];
}
