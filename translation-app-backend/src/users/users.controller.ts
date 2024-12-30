import {Request, Response} from 'express'
import { SuccessResponse } from '../utils/success.response.js';
import { ErrorResponse } from '../utils/error.response.js';
import { addUser } from './users.service.js';
import { UserModel } from './users.model.js';


export async function addUserController(req:Request,res:Response<SuccessResponse|ErrorResponse>){
    const user:UserModel = req.body;
    try {
        await addUser(user);
        res.status(200).json({
            message:"Acccount created successfully successfully",
            statusCode:200
        });
    } catch (error:any) {
        res.status(500).json({
            message:error?.message || "Something went wrong while creating your account",
            statusCode:500
        });
    }
}


