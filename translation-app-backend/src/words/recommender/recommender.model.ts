
import {db} from '../../database/db.js'

export interface RecommenderModel{
    word:string,
    recommendations:string[]
}


export const RecommenderCollection = db.collection<RecommenderModel>(process.env.RECOMMENDATION_COLLECTION!)