import { verifyToken, TokenData } from '../utils/jwt';
import User from '../models/usuario';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //comprobando que halla un token de autorizacion
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'no autorizado' }); // Enviar una respuesta JSON y luego salir
    }

    const token = req.headers.authorization.split(' ').pop();

    //verificando que el token existe
    if (token) {
      //verificando que el token sea valido
      const dataToken = (await verifyToken(token)) as TokenData;

      //veridicando que el token tenga la id del usuario
      if (!dataToken._id) {
        return res.status(409).json({ message: 'Error Id token' }); // Enviar una respuesta JSON y luego salir
      }
      //buscando el usuario
      const user = await User.findById(dataToken._id);

      //si el usuario existe , agregarlo a las respuetas del body
      if (user) {
        // Agregar la propiedad 'user' al objeto req
        req.body.user = user;
        next(); // Llamar a next() para pasar al siguiente middleware o controlador
      } else {
        return res.status(404).json({ message: 'Usuario no encontrado' }); // Enviar una respuesta JSON y luego salir
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' }); // Enviar una respuesta JSON y luego salir
  }
};

export default authMiddleware;
