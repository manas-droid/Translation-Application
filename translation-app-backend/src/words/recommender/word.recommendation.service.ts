import {RecommenderRequest} from "./word.recommender.interface.js";
import { RecommenderCollection, RecommenderModel } from "./recommender.model.js";
import { SuccessResponse } from "../../utils/success.response.js";
import { ErrorResponse } from "../../utils/error.response.js";
import Bull, { QueueOptions } from "bull";
import {} from './word.process.recommendation.service.js'
export interface RecommendationSucessResponse{
    related_words:string[]
}

export interface RecommendationFailureResponse{
    error:string,
    errorType:'LanguageNotSupport'|'IncorrectQuery'|'Unknown'
}

//export type RecommendationResponse = RecommendationSucessResponse|RecommendationFailureResponse;


// Long running task that runs on the Bull Queue
export const getRecommendationsFromApi = async (recommendationRequest:RecommenderRequest):Promise<RecommendationSucessResponse>=>{
    const {lang, word} = recommendationRequest
    const response = await fetch(`${process.env.RECOMMENDATION_SERVER_URL}/api/words/recommendation?lang=${lang}&word=${word}`);
    return await response.json()
}

export const saveRecommendationForWord = async (word:string, wordRecommendations:string[]):Promise<SuccessResponse|ErrorResponse>=>{
    try{
        await RecommenderCollection.insertOne({
            word,
            recommendations:wordRecommendations
        })

        return {
            message:'Recommendation saved successfully',
            statusCode:200
        }        
    }catch(err:any){
        console.error("Error while Saving Recommendation on Db",err);
        return {
            message:'Something went wrong while saving the recommendation',
            statusCode:500
        }
    }
}

const getRecommendationFromDb = async (word:string):Promise<(RecommenderModel|null)|ErrorResponse>=>{
    try {
        return await RecommenderCollection.findOne({word})
    } catch (error:any) {
        console.error("Error while Getting Recommendation from the database");
        return{
            message:'Error while Getting Recommendation from the database',
            statusCode:500
        }
    }

}

const checkIfRecommendationExistsInDb = async(word:string):Promise<boolean|ErrorResponse>=>{
    try{
        return await RecommenderCollection.countDocuments({word}) == 1;
    }catch(error:any){
        console.error("Error while Checking Recommendation from the database");
        return{
            message:'Error while Checking Recommendation from the database',
            statusCode:500
        }
    }
}

const bullOptions:QueueOptions = {
    redis:{
        host:process.env.REDIS_HOST!,
        port:parseInt(process.env.REDIS_PORT!)
    }
}

const wordRecommenderQueue = new Bull<RecommenderRequest>(process.env.RECOMMENDER_QUEUE!, bullOptions);


export const addRecommendations = async (recommendationRequest:RecommenderRequest)=>{
    const {word, lang} = recommendationRequest;
    if(!word) return;

    const response = await checkIfRecommendationExistsInDb(word);
    if(response === true){
        return;
    }
        
    wordRecommenderQueue.add({lang,word})
}



