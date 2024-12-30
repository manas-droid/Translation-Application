import { TranslationResult } from "../utils/translation.response.js";
import {db} from '../database/db.js'


export interface UserWordsModel{
    userId:string,
    savedWords : TranslationResult[]
}

export const UserWordsCollection = db.collection<UserWordsModel>(process.env.WORDS_COLLECTION!);