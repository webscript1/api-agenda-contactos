import {validationResult} from "express-validator";
import { Request, Response, NextFunction } from 'express';

const validationResults=(req:Request,res:Response,next:NextFunction)=>{
    try {
        validationResult(req).throw();
        return next();
    } catch (error:any) {
        res.status(403);
        res.send({erros: error.array()});
        
    }
}

export default validationResults