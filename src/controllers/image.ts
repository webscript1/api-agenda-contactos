
import { Response,Request } from "express";
import fs from 'fs'
import path  from 'path'
import sharp from 'sharp';



const constroller={
    test:(req:Request,res:Response)=>{
        try {
            
            return res.status(200).send({code:200,message:'test image'})
        } catch (error) {
            console.error('error test image: ',error);
            
            return res.status(200).send({code:500,message:'error desconocido'})
        }
    },
    upload:(req:Request,res:Response)=>{
        try {
            const filename=req.file?.filename
            console.log('file')
            console.log(req.file)
           
              // Procesar la imagen con sharp (convertir a WebP)
           
            return res.status(200).send({code:200,message:'imagen guardada',data:filename})
        } catch (error) {
            console.error('error upload image: ',error);
            
            return res.status(200).send({code:500,message:'error desconocido'})
        }
    },
    deleteImage : (req: Request, res: Response) => {
        const image = req.params.name;
        const rutaUploads=path.join(__dirname, '..','..', 'uploads')
        const imagePath = path.join(rutaUploads, image);

        console.log(imagePath)
        try {
           // Verificar si el archivo existe antes de intentar eliminarlo
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                return res.status(200).json({ message: 'Imagen eliminada correctamente' });
            } else {
                return res.status(404).json({ code: 404, message: 'La imagen no existe' });
            }
         
        } catch (error) {
          console.error(error);
          return res.status(500).send({code:500,message:'error desconosido'})
        }
    }
       
}

export default constroller