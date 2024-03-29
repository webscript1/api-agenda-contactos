import {check} from "express-validator";
import  validationResults from '../utils/validator'

class validatorUser{
     public createUser:Array<any>
     public singIn:Array<any>
     public update:Array<any>

        constructor(){
          this.createUser=[
            check('email')
        .exists()
        .trim()
        .notEmpty()
        .isString(),
        check('name')
        .exists()
        .notEmpty()
        .isString(),
        check('apellido')
        .exists()
        .trim()
        .notEmpty()
        .isString(),
        check('password')
        .exists()
        .trim()
        .notEmpty()
        .isString()
        .isLength({ min: 1, max: 20 }),
        (req: any,res: any,next: any)=>{
        
            return validationResults(req,res,next);
            }

        ]  
        this.singIn=[
          check('email')
          .exists()
          .notEmpty()
          .isString(),
          check('password')
          .exists()
          .notEmpty()
          .isString(),
          (req: any,res: any,next: any)=>{
          
              return validationResults(req,res,next);
              }

            ]
        this.update=[
          check('email')
          .optional()
          .trim()
      .notEmpty()
      .isString(),
      check('name')
      .optional()
      .trim()
      .notEmpty()
      .isString(),
      check('apellido')
      .optional()
      .trim()
      .notEmpty()
      .isString(),
      (req: any,res: any,next: any)=>{
      
          return validationResults(req,res,next);
          }

      ]  

        }
}
   


export default validatorUser
