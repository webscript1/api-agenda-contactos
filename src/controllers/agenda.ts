

import { Request,Response } from 'express'
import Contacto  from '../models/agenda'
import Contantos from '../models/agenda'


const controller={
    test:(req:Request,res:Response)=>{
        try {
            return res.status(200).send({
                code:200,
                message:'test agenda'
            })
            
        } catch (error) {
            console.error('error test agenda: ',error)
            return res.status(500).send({
                code:500,
                message:'error desconocido'
            })
        }
        
    },
    create:async (req:Request,res:Response)=>{
        try {
           const {user,img,name,apellido,email,telefono} =req.body
           const contacto= new Contacto(req.body)

           const save_contacto=await contacto.save()

           return res.status(201).send({code:201,message:'contacto creado',data:save_contacto})
            
        } catch (error) {
            console.error('error al crear contacto')
            return res.status(500).send({code:200,message:"error desconocido"})
        }
    },
    get:async (req:Request,res:Response)=>{
        try {
            const {idContacto}= req.params
            const idUser=req.params.idUser

            const get_contacto=await Contacto.findOne({user:idUser,_id:idContacto}) 

            if(!get_contacto) return res.status(404).send({code:404,message:'contacto no encontrado'})
            
            return res.status(200).send({code:200,mesage:'exito',data:get_contacto})
        } catch (error) {
            console.error('error al obtener contacto')
            return res.status(500).send({code:500,message:'error desconocido'})
        }
    },
    getAll:async (req:Request,res:Response)=>{
        try {
            const idUser=req.params.id

            const contactos= await Contacto.find({user:idUser}).lean()

            return res.status(200).send({code:200,count:contactos.length, message:'contactos',data:contactos})
            

            
        } catch (error) {
            console.error('error al crear contacto')
            return res.status(500).send({code:500,message:'error desconocido'})
        }
    },
    update:async (req:Request,res:Response)=>{
        try {
            const {id,name,apellido,email,telefono,img}=req.body
            const idUser=req.body.user
    
            const update={
                name,
                apellido,
                email,
                telefono,
                img
            }

            const updateContacto= await Contacto.findOneAndUpdate({_id:id,user:idUser},update,{new:true})
            
            if(!updateContacto) return res.status(404).send({code:404,message:'contacto no encontrado'})
        
           
            return res.status(200).send({code:200,message:'contacto actualizado',data:updateContacto})

            
        } catch (error) {
            console.error('error al crear contacto')
            return res.status(500).send({code:500,message:'error desconocido'})
        }
    },
    delete:async (req:Request,res:Response)=>{
        try {
            const idContacto=req.params.idContacto
            const idUser=req.params.idUser

            const deleteContacto=await Contacto.deleteOne({_id:idContacto,user:idUser})
            console.log(deleteContacto)

            if(deleteContacto.deletedCount===0) return res.status(404).send({code:404,message:'contacto no encontrado'})
               
            return res.status(200).send({code:200,message:'contacto eliminado',data:deleteContacto})
            
        } catch (error) {
            console.error('error al crear contacto')
            return res.status(500).send({code:500,message:'error desconocido'})
        }
    },
    deleteAll:async (req:Request,res:Response)=>{
        try {
            const idUser=req.params.idUser
            const deleteAllContacto=await Contacto.deleteMany({user:idUser})

            if(deleteAllContacto.deletedCount===0) return res.status(404).send({code:404,message:'contactos no encontrados'})

            return res.status(200).send({code:200,message:'todos los contactos han sido eliminados',data:deleteAllContacto})

            
        } catch (error) {
            console.error('error al eliminar todos los contactos')
            return res.status(500).send({message:'error desconocido'})
        }
    }
}

export default controller