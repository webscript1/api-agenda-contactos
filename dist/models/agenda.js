"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const contactoSchema = new Schema({
    image: String,
    name: String,
    apellido: String,
    email: String,
    telefono: String,
    user: {
        type: Schema.Types.ObjectId, // Esto indica que el campo es de tipo ObjectId
        ref: 'Usuario' // Referencia al modelo de Usuario (asegúrate de tener un modelo de Usuario)
    }
});
const Contactos = mongoose_1.default.model('contacto', contactoSchema);
exports.default = Contactos;
//# sourceMappingURL=agenda.js.map