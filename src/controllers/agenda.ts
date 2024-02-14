

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
           const id=req.body.user._id
           contacto.user=id
           const limit=Number(req.params.limit) || 10

           const save_contacto=await contacto.save()
           const result = await Contantos.paginate({user:id}, { page: 1, limit: limit });

           return res.status(201).send({code:201,message:'contacto creado',data:result})
            
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
            const idUser=req.body.user._id
            const page=Number(req.params.page)
            const limit=Number(req.params.limit)
      
        //    const contactos= await Contacto.find({user:idUser}).lean()
            const result = await Contantos.paginate({user:idUser}, { page: page, limit: limit });

            return res.status(200).send({code:200,count:result.length, message:'contactos',data:result})
            

            
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
            const idUser=req.body.user._id

            const deleteContacto=await Contacto.deleteOne({_id:idContacto,user:idUser})
            console.log(deleteContacto)

            if(deleteContacto.deletedCount===0) return res.status(404).send({code:404,message:'contacto no encontrado'})
            const totalContactos=await Contacto.countDocuments({user:idUser})
             const data={
                totalDocs:totalContactos,
                deleteContacto
             }
            return res.status(200).send({code:200,message:'contacto eliminado',data:data})
            
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
    },
    busquedas:async (req:Request,res:Response)=>{
        try {
            const {name}= req.params
            const idUser=req.body.user._id
            // Dividir el nombre completo en partes (nombre y apellido)
           const [nombre, apellido] = name.split(' ');
           

           if(apellido){
         
            const get_contacto = await Contacto.find({
                
                $and: [
                    {user:idUser},
                  { name: { $regex: new RegExp(nombre, 'i') } },
                  { apellido: { $regex: new RegExp(apellido, 'i') } }
                ]
              });

              return res.status(200).send({code:200,mesage:'exito',data:get_contacto})


           }else{
            
            const get_contacto=await Contacto.find({ 
                user:idUser,
                $or: [
                 
                { name: { $regex: new RegExp(name, 'i') } },
                { apellido: { $regex: new RegExp(name, 'i') } },
                { email: { $regex: new RegExp(name, 'i') } },
                { telefono: { $regex: new RegExp(name, 'i') } }
              ]})
          
            if(!get_contacto) return res.status(404).send({code:404,message:'contacto no encontrado .'})
            
            return res.status(200).send({code:200,mesage:'exito',data:get_contacto})

           }
          
        } catch (error) {
            console.error('error al buscar contacto')
            return res.status(500).send({code:500,message:'error desconocido'})
        }
    },
}

export default controller