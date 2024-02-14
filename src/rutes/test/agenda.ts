'use strict'
import express from 'express'
import agendaController from '../../controllers/agenda'
import auth from '../../middleware/sesion'
import validatorContacto from '../../middleware/validatorContacto'
const validator= new validatorContacto()
const router=express.Router()

router.get('/test',agendaController.test)
router.post('/create/:limit',auth, validator.createContacto, agendaController.create)
router.get('/get/:idUser/:idContacto',auth, agendaController.get)
router.get('/get-all/:page/:limit',auth, agendaController.getAll)
router.put('/update',auth,validator.update, agendaController.update)
router.delete('/delete/:idContacto/',auth, agendaController.delete)
router.delete('/delete-all/:idUser',auth, agendaController.deleteAll)
router.get('/busqueda/:name/',auth, agendaController.busquedas)


export default router