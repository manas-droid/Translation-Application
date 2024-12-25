import {Request, Response} from 'express'
import { SuccessResponse} from '../utils/success.response.js';
import { ErrorResponse } from '../utils/error.response.js';
import { TranslationResult } from '../utils/translation.response.js';
import { saveTranslation } from './user.words.service.js';


export async function saveTranslationController(req:Request,res:Response<SuccessResponse|ErrorResponse>){
    const translatedWord = req.body as TranslationResult;

    const response = await saveTranslation(translatedWord);

    res.status(response.statusCode).json(response);
}


