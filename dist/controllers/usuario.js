"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("../models/usuario"));
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const controller = {
    test: (req, res) => {
        try {
            return res.status(200).send({
                code: 200,
                message: 'test usuario'
            });
        }
        catch (error) {
            console.error('error test usuario: ', error);
            return res.status(500).send({
                code: 500,
                message: 'error desconocido'
            });
        }
    },
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const usuario = new usuario_1.default(req.body);
            const buscar_user = yield usuario_1.default.findOne({ email: email });
            if (buscar_user)
                return res.status(409).send({ code: 409, message: 'email esta en uso' });
            usuario.password = yield (0, password_1.encrypt)(password);
            const save_user = yield usuario.save();
            //  save_user.password=''
            if (!save_user)
                return res.status(404).send({ code: 404, message: 'no se pudo guardar' });
            const token = yield (0, jwt_1.tokenSing)(save_user);
            const data = {
                code: 201,
                meessage: 'usuario creado satisfactoriamente',
                data: save_user,
                token: token
            };
            return res.status(201).send(data);
        }
        catch (error) {
            console.error('error al crear user', error);
            return res.status(500).send({ code: 500, message: 'error desconocido' });
        }
    }),
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const buscar_user = yield usuario_1.default.findById(id).select('-password');
            if (!buscar_user)
                return res.status(404).send({ code: 404, message: 'no encontrado' });
            const data = {
                code: 200,
                message: 'exito',
                data: buscar_user
            };
            return res.status(200).send(data);
        }
        catch (error) {
            console.error('error al crear contacto', error);
            return res.status(500).send({ code: 500, message: 'error desconocido' });
        }
    }),
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usuarios = yield usuario_1.default.find().select('-password').lean();
            return res.status(200).send({ count: usuarios.length, code: 200, message: 'usuarios', data: usuarios });
        }
        catch (error) {
            console.error('error al crear contacto');
            return res.status(500).send({ code: 500, mmessage: 'error desconocido' });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, apellido } = req.body;
            const update = { name: name, apellido: apellido };
            const user_update = yield usuario_1.default.findByIdAndUpdate(id, update, { new: true }).select('-password');
            if (!user_update)
                return res.status(404).send({ code: 404, message: 'user no encontrado' });
            return res.status(200).send({ code: 200, message: 'user actualizado', data: user_update });
        }
        catch (error) {
            console.error('error al crear contacto');
            return res.status(500).send({ code: 500, mmessage: 'error desconocido' });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user_delete = yield usuario_1.default.findByIdAndDelete(id).select('-password');
            if (!user_delete)
                return res.status(404).send({ code: 404, message: 'user no encontrado para eliminar' });
            return res.status(200).send({ code: 200, message: 'user eliminado', data: user_delete });
        }
        catch (error) {
            console.error('error al crear contacto');
            return res.status(500).send({ code: 500, message: 'error desconocido' });
        }
    }),
    deleteAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const delete_all = yield usuario_1.default.deleteMany().select('-password');
            return res.status(200).send({ code: 200, message: 'todos losusuarios eliminados', data: delete_all });
        }
        catch (error) {
            console.error('error al crear contacto');
            return res.status(500).send({ code: 500, message: 'error desconocido' });
        }
    }),
    singIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password, email } = req.body;
            const buscarUser = yield usuario_1.default.findOne({ email: email });
            if (!buscarUser)
                return res.status(404).send({ code: 404, message: "email no existe" });
            const comparePassword = yield (0, password_1.compare)(password, buscarUser.password);
            if (!comparePassword)
                return res.status(401).send({ code: 401, message: 'contraseña invalida' });
            const token = yield (0, jwt_1.tokenSing)(buscarUser);
            return res.status(200).send({ code: 200, token: token, message: 'sesion iniciada', buscarUser });
        }
        catch (error) {
            console.error('error aliniciar session : ', error);
            return res.status(500).send({
                code: 500,
                message: 'error desconocido'
            });
        }
    }),
};
exports.default = controller;
//# sourceMappingURL=usuario.js.map