'use strict'

import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'

//cargar archivos rutas tesnet
import agendaRouterTest from './rutes/agenda'
import usuarioRouterTest from './rutes/usuario'



//cargar archivos rutas v1
const app = express();

app.use(morgan('dev'));

//middlewares: es un metodo que se ejecuta antes, de la accion de un controlador.

// Configuración para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(helmet())
app.use(express.urlencoded({ extended: false }));

//CORS
app.use(cors())

//rutas de pruebas
app.use('/test',agendaRouterTest)
app.use('/test-user',usuarioRouterTest)


//rutas v1




//exportar
export default app;
