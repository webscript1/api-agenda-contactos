'use strict'
import express from 'express'
import agendaController from '../controllers/agenda'
import auth from '../middleware/sesion'

const router=express.Router()

router.get('/test',agendaController.test)
router.post('/create',agendaController.create)
router.get('/get/:idUser/:idContacto',auth, agendaController.get)
router.get('/get-all/:id',auth, agendaController.getAll)
router.put('/update',auth, agendaController.update)
router.delete('/delete/:idContacto/:idUser',auth, agendaController.delete)
router.delete('/delete-all/:idUser',auth, agendaController.deleteAll)


export default router