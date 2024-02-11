"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator_1 = __importDefault(require("../utils/validator"));
class ValidatorUser {
    constructor() { }
    validatorCreateUser() {
        return [
            (0, express_validator_1.check)('email')
                .exists()
                .notEmpty()
                .isString(),
            (0, express_validator_1.check)('name')
                .exists()
                .notEmpty()
                .isNumeric(),
            (0, express_validator_1.check)('apellido')
                .exists()
                .notEmpty()
                .isString(),
            (0, express_validator_1.check)('password')
                .exists()
                .notEmpty()
                .isString()
                .isLength({ min: 1, max: 20 }),
            (req, res, next) => {
                console.log('sapin 2');
                return (0, validator_1.default)(req, res, next);
            }
        ];
    }
}
exports.default = ValidatorUser;
//# sourceMappingURL=validatorUser.js.map