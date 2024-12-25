import {Router} from 'express'
import { saveTranslationController } from './user..words.controller.js';

const userWordsRouter = Router()

userWordsRouter.post('/user/word', saveTranslationController);


export default userWordsRouter  