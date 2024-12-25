import { TranslationResult } from "../utils/translation.response.js";
import {db} from '../database/db.js'


export interface UserWordsResponse{
    userId:string,
    savedWords : TranslationResult[]
}

export const UserWordsCollection = db.collection<UserWordsResponse>(process.env.COLLECTION_NAME!);