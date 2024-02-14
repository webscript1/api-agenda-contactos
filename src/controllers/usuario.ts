

import { Request,Response } from 'express'
import Usuario from '../models/usuario'
import { encrypt,compare } from '../utils/password'
import { tokenSing } from '../utils/jwt'
import Contactos from '../models/agenda'

const controller={
    test:(req:Request,res:Response)=>{
        try {
            return res.status(200).send({
                code:200,
                message:'test usuario'
            })
            
        } catch (error) {
            console.error('error test usuario: ',error)
            return res.status(500).send({
                code:500,
                message:'error desconocido'
            })
        }
        
    },
    create:async (req:Request,res:Response)=>{
        try {
            const {email,password}= req.body
            const usuario=new Usuario(req.body)
           

           const buscar_user=await Usuario.findOne({email:email})
           
           if(buscar_user) return res.status(409).send({code:409,message:'email esta en uso'})
           usuario.password=await encrypt(password)
           const  save_user=await usuario.save()
                 //  save_user.password=''

           

          if(!save_user) return res.status(404).send({code:404,message:'no se pudo guardar'})
          
          const token=await tokenSing(save_user)
          const data={
            code:201,
            meessage:'usuario creado satisfactoriamente',
            data:save_user,
            token:token
            
          }

          return res.status(201).send(data)
            
        } catch (error) {
            console.error('error al crear user',error)
            return res.status(500).send({code:500,message:'error desconocido'})
        }
    },
    get:async (req:Request,res:Response)=>{
        try {
            const {id}=req.params

            const buscar_user = await Usuario.findById(id).select('-password');


            if(!buscar_user) return res.status(404).send({code:404,message:'no encontrado'})
            const data={
               code:200,
               message:'exito',
               data: buscar_user
            }
            return res.status(200).send(data)
        } catch (error) {
            console.error('error al crear contacto',error)
            return res.status(500).send({code:500,message:'error desconocido'})
        }
    },
    getAll:async (req:Request,res:Response)=>{
        try {
            const usuarios= await Usuario.find().select('-password').lean()

            return res.status(200).send({count:usuarios.length,code:200,message:'usuarios',data:usuarios})
            
        } catch (error) {
            console.error('error al crear contacto')
            return res.status(500).send({code:500,mmessage:'error desconocido'})
        }
    },
    update:async (req:Request,res:Response)=>{
        try {
            const {id}=req.params
            const {name,apellido}=req.body

            const update={name:name,apellido:apellido}
            
            const user_update=await Usuario.findByIdAndUpdate(id,update,{new:true}).select('-password')

            if(!user_update) return res.status(404).send({code:404,message:'user no encontrado'})

            return res.status(200).send({code:200,message:'user actualizado',data:user_update})
            
        } catch (error) {
            console.error('error al crear contacto')
            return res.status(500).send({code:500,mmessage:'error desconocido'})
        }
    },
    delete:async (req:Request,res:Response)=>{
        try {
            const {id}=req.params

            const user_delete=await Usuario.findByIdAndDelete(id).select('-password')

            if(!user_delete) return res.status(404).send({code:404,message:'user no encontrado para eliminar'})
            
            return res.status(200).send({code:200,message:'user eliminado',data:user_delete})
        } catch (error) {
            console.error('error al crear contacto')
            return res.status(500).send({code:500,message:'error desconocido'})
        }
    },
    deleteAll:async (req:Request,res:Response)=>{
        try {
            const delete_all=await Usuario.deleteMany().select('-password')

            return res.status(200).send({code:200, message:'todos losusuarios eliminados',data:delete_all})

            
        } catch (error) {
            console.error('error al crear contacto')
            return res.status(500).send({code:500, message:'error desconocido'})
        }
    },
    singIn:async (req:Request,res:Response)=>{
        try {
            const {password,email}=req.body

            const buscarUser= await Usuario.findOne({email:email})
            
            if(!buscarUser) return res.status(404).send({code:404,message:"email no existe"})
          
            const comparePassword=await compare(password,buscarUser.password)
            if(!comparePassword) return res.status(401).send({code:401,message:'contraseña invalida'})
            const token= await tokenSing(buscarUser)
            return res.status(200).send({code:200,token:token,message:'sesion iniciada',data:buscarUser})
           
        
            
        } catch (error) {
            console.error('error aliniciar session : ',error)
            return res.status(500).send({
                code:500,
                message:'error desconocido'
            })
        }
        
    },
}

export default controller