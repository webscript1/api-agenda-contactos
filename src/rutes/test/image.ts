'use strict'
import express from 'express'
import imageController from '../../controllers/image'
import { uploadMiddleware } from '../../middleware/uploadImage' 

import auth from '../../middleware/sesion'

const router=express.Router()

router.get('/test',imageController.test)
router.post('/upload',uploadMiddleware,imageController.upload)
router.delete('/delete/:name',uploadMiddleware,imageController.deleteImage)



export default router