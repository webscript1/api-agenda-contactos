'uset strict';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

// Asegurarte de que la variable JWT_SECRET nunca sea undefined
if (!JWT_SECRET) {
  throw new Error('La variable JWT_SECRET no está definida');
}

/**
 * firmar data con jwt
 * @param user
 * @returns
 */
//user es el objeto del usuario a firmar
export const tokenSing = async (user: any) => {
  try {
    //firmar token
    const sign = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: '60h',
      },
    );
    return sign;
  } catch (error) {
    console.log('error al firtar token: ' + error);
    throw error;
  }
};

/**
 * veridicar el JWT
 * @param tokenJwt
 * @returns
 */
//Verificar el token de session
export const verifyToken = async (tokenJwt: string) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    console.log('error  al verificar token: ' + e);
    throw e;
  }
};

// En tu archivo jwt.ts
export interface TokenData {
  _id: string; // O el tipo adecuado para tu identificador de usuario
  role: string; // Otros campos que puedas tener en tu token
  // ...
}
