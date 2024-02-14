'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
//cargar archivos rutas tesnet
const agenda_1 = __importDefault(require("./rutes/test/agenda"));
const usuario_1 = __importDefault(require("./rutes/test/usuario"));
const image_1 = __importDefault(require("./rutes/test/image"));
//cargar archivos rutas v1
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
//middlewares: es un metodo que se ejecuta antes, de la accion de un controlador.
// Configuración para analizar el cuerpo de las solicitudes como JSON
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
//CORS
const corsOptions = {
    origin: '**', // Reemplaza con el dominio de tu aplicación cliente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita el intercambio de cookies entre el cliente y el servidor
    optionsSuccessStatus: 204,
};
//app.use(cors(corsOptions));
app.use((0, cors_1.default)());
//rutas de pruebas
app.use('/test', agenda_1.default);
app.use('/test-user', usuario_1.default);
app.use('/test-image', image_1.default);
//rutas v1
//exportar
exports.default = app;
//# sourceMappingURL=app.js.map