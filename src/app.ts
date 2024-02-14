'use strict'

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'

//cargar archivos rutas tesnet
import agendaRouterTest from './rutes/test/agenda'
import usuarioRouterTest from './rutes/test/usuario'
import imageRouterTest from './rutes/test/image'



//cargar archivos rutas v1
const app = express();

app.use(morgan('dev'));

//middlewares: es un metodo que se ejecuta antes, de la accion de un controlador.

// Configuración para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(helmet())
app.use(express.urlencoded({ extended: false }));

//CORS
const corsOptions = {
    origin: '**', // Reemplaza con el dominio de tu aplicación cliente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita el intercambio de cookies entre el cliente y el servidor
    optionsSuccessStatus: 204,
  };
  
  //app.use(cors(corsOptions));
app.use(cors())

//rutas de pruebas
app.use('/test',agendaRouterTest)
app.use('/test-user',usuarioRouterTest)
app.use('/test-image',imageRouterTest)


//rutas v1




//exportar
export default app;
