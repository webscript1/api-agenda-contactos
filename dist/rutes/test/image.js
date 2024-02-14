'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_1 = __importDefault(require("../../controllers/image"));
const uploadImage_1 = require("../../middleware/uploadImage");
const router = express_1.default.Router();
router.get('/test', image_1.default.test);
router.post('/upload', uploadImage_1.uploadMiddleware, image_1.default.upload);
router.delete('/delete/:name', uploadImage_1.uploadMiddleware, image_1.default.deleteImage);
exports.default = router;
//# sourceMappingURL=image.js.map