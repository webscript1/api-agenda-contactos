'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agenda_1 = __importDefault(require("../../controllers/agenda"));
const sesion_1 = __importDefault(require("../../middleware/sesion"));
const validatorContacto_1 = __importDefault(require("../../middleware/validatorContacto"));
const validator = new validatorContacto_1.default();
const router = express_1.default.Router();
router.get('/test', agenda_1.default.test);
router.post('/create/:limit', sesion_1.default, validator.createContacto, agenda_1.default.create);
router.get('/get/:idUser/:idContacto', sesion_1.default, agenda_1.default.get);
router.get('/get-all/:page/:limit', sesion_1.default, agenda_1.default.getAll);
router.put('/update', sesion_1.default, validator.update, agenda_1.default.update);
router.delete('/delete/:idContacto/', sesion_1.default, agenda_1.default.delete);
router.delete('/delete-all/:idUser', sesion_1.default, agenda_1.default.deleteAll);
router.get('/busqueda/:name/', sesion_1.default, agenda_1.default.busquedas);
exports.default = router;
//# sourceMappingURL=agenda.js.map