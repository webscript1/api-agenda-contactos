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
const agenda_1 = __importDefault(require("../models/agenda"));
const controller = {
    test: (req, res) => {
        try {
            return res.status(200).send({
                code: 200,
                message: 'test agenda'
            });
        }
        catch (error) {
            console.error('error test agenda: ', error);
            return res.status(500).send({
                code: 500,
                message: 'error desconocido'
            });
        }
    },
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user, img, name, apellido, email, telefono } = req.body;
            const contacto = new agenda_1.default(req.body);
            const save_contacto = yield contacto.save();
            return res.status(201).send({ code: 201, message: 'contacto creado', data: save_contacto });
        }
        catch (error) {
            console.error('error al crear contacto');
            return res.status(500).send({ code: 200, message: "error desconocido" });
        }
    }),
    get: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { idContacto } = req.params;
            const idUser = req.params.idUser;
            const get_contacto = yield agenda_1.default.findOne({ user: idUser, _id: idContacto });
            if (!get_contacto)
                return res.status(404).send({ code: 404, message: 'contacto no encontrado' });
            return res.status(200).send({ code: 200, mesage: 'exito', data: get_contacto });
        }
        catch (error) {
            console.error('error al obtener contacto');
            return res.status(500).send({ code: 500, message: 'error desconocido' });
        }
    }),
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const idUser = req.params.id;
            const contactos = yield agenda_1.default.find({ user: idUser }).lean();
            return res.status(200).send({ code: 200, count: contactos.length, message: 'contactos', data: contactos });
        }
        catch (error) {
            console.error('error al crear contacto');
            return res.status(500).send({ code: 500, message: 'error desconocido' });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, name, apellido, email, telefono, img } = req.body;
            const idUser = req.body.user;
            const update = {
                name,
                apellido,
                email,
                telefono,
                img
            };
            const updateContacto = yield agenda_1.default.findOneAndUpdate({ _id: id, user: idUser }, update, { new: true });
            if (!updateContacto)
                return res.status(404).send({ code: 404, message: 'contacto no encontrado' });
            return res.status(200).send({ code: 200, message: 'contacto actualizado', data: updateContacto });
        }
        catch (error) {
            console.error('error al crear contacto');
            return res.status(500).send({ code: 500, message: 'error desconocido' });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const idContacto = req.params.idContacto;
            const idUser = req.params.idUser;
            const deleteContacto = yield agenda_1.default.deleteOne({ _id: idContacto, user: idUser });
            console.log(deleteContacto);
            if (deleteContacto.deletedCount === 0)
                return res.status(404).send({ code: 404, message: 'contacto no encontrado' });
            return res.status(200).send({ code: 200, message: 'contacto eliminado', data: deleteContacto });
        }
        catch (error) {
            console.error('error al crear contacto');
            return res.status(500).send({ code: 500, message: 'error desconocido' });
        }
    }),
    deleteAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const idUser = req.params.idUser;
            const deleteAllContacto = yield agenda_1.default.deleteMany({ user: idUser });
            if (deleteAllContacto.deletedCount === 0)
                return res.status(404).send({ code: 404, message: 'contactos no encontrados' });
            return res.status(200).send({ code: 200, message: 'todos los contactos han sido eliminados', data: deleteAllContacto });
        }
        catch (error) {
            console.error('error al eliminar todos los contactos');
            return res.status(500).send({ message: 'error desconocido' });
        }
    })
};
exports.default = controller;
//# sourceMappingURL=agenda.js.map