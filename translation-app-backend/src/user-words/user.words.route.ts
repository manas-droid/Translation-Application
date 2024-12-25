import {Router,Request,Response} from 'express'
import { TranslationResult } from '../utils/translation.response.js';
import { SuccessResponse } from '../utils/success.response.js';
import { ErrorResponse } from '../utils/error.response.js';
import { saveTranslation } from './user.words.service.js';

const userWordsRouter = Router()


userWordsRouter.post('/user/word', async (req:Request,res:Response<SuccessResponse|ErrorResponse>)=>{
    console.log("User Word Post Request", req.body);
    const translatedWord = req.body as TranslationResult;

    const response = await saveTranslation(translatedWord);

    res.status(response.statusCode).json(response);

});


export default userWordsRouter  