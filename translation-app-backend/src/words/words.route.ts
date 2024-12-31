import {Router} from 'express'
import { saveTranslationController, getUserTranslationsController } from './words.controller.js';

const userWordsRouter = Router()

userWordsRouter.post('/user/word', saveTranslationController);
userWordsRouter.get('/user/word', getUserTranslationsController);

export default userWordsRouter  