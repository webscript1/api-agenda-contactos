import {check} from "express-validator";
import  validationResults from '../utils/validator'

class validatorContacto{
     public createContacto:Array<any>
     public update:Array<any>

        constructor(){
          this.createContacto=[
            check('email')
        .exists()
        .trim()
        .notEmpty()
        .isString(),
        check('name')
        .exists()
        .trim()
        .notEmpty()
        .isString(),
        check('apellido')
        .exists()
        .trim()
        .notEmpty()
        .isString(),
        check('telefono')
        .exists()
        .trim()
        .notEmpty()
        .isString()
        .isLength({ min: 1, max: 20 }),
        check('image')
        .optional()
        .trim()
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
            check('telefono')
            .optional()
            .trim()
            .notEmpty()
            .isString(),
            check('image')
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
   


export default validatorContacto
