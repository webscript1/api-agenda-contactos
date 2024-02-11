"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validationResults = (req, res, next) => {
    try {
        (0, express_validator_1.validationResult)(req).throw();
        return next();
    }
    catch (error) {
        res.status(403);
        res.send({ erros: error.array() });
    }
};
exports.default = validationResults;
//# sourceMappingURL=validator.js.map