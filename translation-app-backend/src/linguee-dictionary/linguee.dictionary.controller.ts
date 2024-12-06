import {Request, Response} from 'express'
import { ErrorResponse, LingueeResponse, TranslationResult } from './lingue.dictionary.interface.js';
import { mapToLingueeResponse } from './linguee.dictionary.mapper.js';

export async function getLingueeTranslation(req:Request, res:Response<(TranslationResult|ErrorResponse)>){
  const { word } = req.query;
  const response = await fetch(`https://linguee-api.fly.dev/api/v2/translations?query=${word}&src=de&dst=en`);

  const lingueeWord:LingueeResponse[] = await response.json();

  if(lingueeWord == null || lingueeWord.length == 0){
    res.status(404).json({message: 'Word Not Found', statusCode:404});
    return;
  }
  const result: TranslationResult =  mapToLingueeResponse(lingueeWord)

  res.status(200).json(result)
}
