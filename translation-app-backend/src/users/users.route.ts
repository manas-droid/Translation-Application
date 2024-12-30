import {Router} from 'express'
import { addUserController } from './users.controller.js';

const usersRouter = Router()

usersRouter.post('/user', addUserController);


export default usersRouter  