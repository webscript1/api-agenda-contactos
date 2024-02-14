"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../utils/validator"));
class validatorContacto {
    constructor() {
        this.createContacto = [
            (0, express_validator_1.check)('email')
                .exists()
                .trim()
                .notEmpty()
                .isString(),
            (0, express_validator_1.check)('name')
                .exists()
                .trim()
                .notEmpty()
                .isString(),
            (0, express_validator_1.check)('apellido')
                .exists()
                .trim()
                .notEmpty()
                .isString(),
            (0, express_validator_1.check)('telefono')
                .exists()
                .trim()
                .notEmpty()
                .isString()
                .isLength({ min: 1, max: 20 }),
            (0, express_validator_1.check)('image')
                .optional()
                .trim()
                .notEmpty()
                .isString(),
            (req, res, next) => {
                return (0, validator_1.default)(req, res, next);
            }
        ];
        this.update = [
            (0, express_validator_1.check)('email')
                .optional()
                .trim()
                .notEmpty()
                .isString(),
            (0, express_validator_1.check)('name')
                .optional()
                .trim()
                .notEmpty()
                .isString(),
            (0, express_validator_1.check)('apellido')
                .optional()
                .trim()
                .notEmpty()
                .isString(),
            (0, express_validator_1.check)('telefono')
                .optional()
                .trim()
                .notEmpty()
                .isString(),
            (0, express_validator_1.check)('image')
                .optional()
                .trim()
                .notEmpty()
                .isString(),
            (req, res, next) => {
                return (0, validator_1.default)(req, res, next);
            }
        ];
    }
}
exports.default = validatorContacto;
//# sourceMappingURL=validatorContacto.js.map