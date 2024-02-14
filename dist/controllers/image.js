"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const constroller = {
    test: (req, res) => {
        try {
            return res.status(200).send({ code: 200, message: 'test image' });
        }
        catch (error) {
            console.error('error test image: ', error);
            return res.status(200).send({ code: 500, message: 'error desconocido' });
        }
    },
    upload: (req, res) => {
        var _a;
        try {
            const filename = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            console.log('file');
            console.log(req.file);
            // Procesar la imagen con sharp (convertir a WebP)
            return res.status(200).send({ code: 200, message: 'imagen guardada', data: filename });
        }
        catch (error) {
            console.error('error upload image: ', error);
            return res.status(200).send({ code: 500, message: 'error desconocido' });
        }
    },
    deleteImage: (req, res) => {
        const image = req.params.name;
        const rutaUploads = path_1.default.join(__dirname, '..', '..', 'uploads');
        const imagePath = path_1.default.join(rutaUploads, image);
        console.log(imagePath);
        try {
            // Verificar si el archivo existe antes de intentar eliminarlo
            if (fs_1.default.existsSync(imagePath)) {
                fs_1.default.unlinkSync(imagePath);
                return res.status(200).json({ message: 'Imagen eliminada correctamente' });
            }
            else {
                return res.status(404).json({ code: 404, message: 'La imagen no existe' });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({ code: 500, message: 'error desconosido' });
        }
    }
};
exports.default = constroller;
//# sourceMappingURL=image.js.map