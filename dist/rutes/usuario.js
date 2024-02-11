'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../controllers/usuario"));
const sesion_1 = __importDefault(require("../middleware/sesion"));
const validatorUser_1 = __importDefault(require("../middleware/validatorUser"));
const validatorUser = new validatorUser_1.default();
const router = express_1.default.Router();
router.get('/test', usuario_1.default.test);
router.post('/create', validatorUser.validatorCreateUser, usuario_1.default.create);
router.get('/get/:id', usuario_1.default.get);
router.get('/get-all', sesion_1.default, usuario_1.default.getAll); //admin
router.put('/update/:id', sesion_1.default, usuario_1.default.update);
router.delete('/delete/:id', sesion_1.default, usuario_1.default.delete);
router.delete('/delete-all', sesion_1.default, usuario_1.default.deleteAll); //admin
router.post('/sing-in', usuario_1.default.singIn);
exports.default = router;
//# sourceMappingURL=usuario.js.map