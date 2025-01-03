import {Request, Response} from 'express'
import { SuccessResponse} from '../utils/success.response.js';
import { ErrorResponse } from '../utils/error.response.js';
import { TranslationResult } from '../utils/translation.response.js';
import { saveTranslation, getAllTranslations } from './words.service.js';
import { SavedWords } from './words.model.js';


export async function saveTranslationController(req:Request,res:Response<SuccessResponse|ErrorResponse>){
    const userTranslationReq = req.body as {translation:SavedWords, userId:string};
    const response = await saveTranslation(userTranslationReq.translation, userTranslationReq.userId);
    res.status(response.statusCode).json(response);
}


export async function getUserTranslationsController(req:Request,res:Response<TranslationResult[]>){
    const {userId} = req.query;
    const response = await getAllTranslations(userId as string);
    res.status(200).json(response);
}


