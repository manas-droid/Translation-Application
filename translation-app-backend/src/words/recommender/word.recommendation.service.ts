import {RecommenderRequest} from "./word.recommender.interface.js";
import { RecommenderCollection, RecommenderModel } from "./recommender.model.js";
import { SuccessResponse } from "../../utils/success.response.js";
import { ErrorResponse } from "../../utils/error.response.js";
import Bull, { QueueOptions } from "bull";
import { UserWordsCollection } from "../words.model.js";
import { addRecommendationToCache, getRecommendationFromCache } from "./recommender.cache.js";
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

export const saveRecommendationForWord = async (recommender:RecommenderModel):Promise<SuccessResponse|ErrorResponse>=>{
    try{
        await RecommenderCollection.insertOne({
            word:recommender.word,
            lang:recommender.lang,
            recommendations:recommender.recommendations
        })
        await addRecommendationToCache(recommender.word, recommender.recommendations);
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

export const getRecommendationFromDb = async (word:string):Promise<string[]|null|undefined>=>{
    try {
        const cachedResponse = await getRecommendationFromCache(word);
        
        if(cachedResponse && cachedResponse.length > 0){
            return cachedResponse;
        }
        const result = (await RecommenderCollection.findOne({word}))?.recommendations;
        if(result)
            addRecommendationToCache(word, result);
        return result; 
    } catch (error:any) {
        console.error("Error while Getting Recommendation from the database", error);
        return null;
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
    const {word, lang, userId} = recommendationRequest;
    if(!word) return;

    const response = await getRecommendationFromDb(word);
    if(response!=null){
        await saveRecommendationForUser(recommendationRequest.userId, word, response);
        
    }
    else
        wordRecommenderQueue.add({lang,word,userId})
}

export const saveRecommendationForUser = async (userId:string, word:string, recommendations:string[]):Promise<void>=>{

    await UserWordsCollection.updateOne({userId, "savedWords.text": word}, { $set : {"savedWords.$.recommendations": recommendations}}, {upsert:true});
}


