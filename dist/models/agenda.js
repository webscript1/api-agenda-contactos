"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const Schema = mongoose_1.default.Schema;
const contactoSchema = new Schema({
    image: String,
    name: String,
    apellido: String,
    email: String,
    telefono: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});
contactoSchema.plugin(mongoose_paginate_v2_1.default);
const model = mongoose_1.default.model('Contactos', contactoSchema, 'contactos');
exports.default = model;
//const Contactos = mongoose.model('contacto', contactoSchema);
//# sourceMappingURL=agenda.js.map