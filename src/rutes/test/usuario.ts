'use strict'
import express from 'express'
import usuarioController from '../../controllers/usuario'
import auth from '../../middleware/sesion'
import ValidatorUser from '../../middleware/validatorUser'
const validator=new ValidatorUser()

const router=express.Router()

router.get('/test',usuarioController.test)
router.post('/create',validator.createUser,usuarioController.create)
router.get('/get/:id', usuarioController.get)
router.get('/get-all',auth, usuarioController.getAll)//admin
router.put('/update/:id',validator.update,auth,usuarioController.update)
router.delete('/delete/:id',auth,usuarioController.delete)
router.delete('/delete-all',auth,usuarioController.deleteAll)//admin
router.post('/sing-in',validator.singIn, usuarioController.singIn)



export default router