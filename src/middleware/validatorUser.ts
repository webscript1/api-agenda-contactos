import {check} from "express-validator";
import  validationResults from '../utils/validator'

class ValidatorUser{
     
    
    constructor(){    }

    validatorCreateUser(){
        return[
            check('email')
        .exists()
        .notEmpty()
        .isString(),
      check('name')
        .exists()
        .notEmpty()
        .isNumeric(),
      check('apellido')
        .exists()
        .notEmpty()
        .isString(),
      check('password')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 1, max: 20 })
        ,    
            (req: any,res: any,next: any)=>{
              console.log('sapin 2')
                return validationResults(req,res,next);
            }
        ]

        }
}


export default ValidatorUser
