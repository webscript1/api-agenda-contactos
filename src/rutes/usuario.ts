'use strict'
import express from 'express'
import usuarioController from '../controllers/usuario'
import auth from '../middleware/sesion'
import ValidatorUser from '../middleware/validatorUser'
const validatorUser=new ValidatorUser()

const router=express.Router()

router.get('/test',usuarioController.test)
router.post('/create',validatorUser.validatorCreateUser,usuarioController.create)
router.get('/get/:id',usuarioController.get)
router.get('/get-all',auth, usuarioController.getAll)//admin
router.put('/update/:id',auth,usuarioController.update)
router.delete('/delete/:id',auth,usuarioController.delete)
router.delete('/delete-all',auth,usuarioController.deleteAll)//admin
router.post('/sing-in',usuarioController.singIn)



export default router