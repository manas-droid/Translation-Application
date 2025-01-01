import { TranslationResult } from "../utils/translation.response.js";
import {db} from '../database/db.js'

export interface SavedWords extends TranslationResult{
    recommendations:string[]
}

export interface UserWordsModel{
    userId:string,
    savedWords: SavedWords[]
}

export const UserWordsCollection = db.collection<UserWordsModel>(process.env.WORDS_COLLECTION!);