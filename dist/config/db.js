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
const mongoose_1 = __importDefault(require("mongoose"));
const databasePassword = process.env.DATABASEPASSWORD;
const databaseUser = process.env.DATABASEUSER;
const databaseUrl = process.env.URLDATABASE;
const databaseConnectionString = `mongodb+srv://${databaseUser}:${databasePassword}@${databaseUrl}`;
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connectedDatabase = yield mongoose_1.default.connect(databaseConnectionString);
        console.log('Connected to the database successfully');
        return connectedDatabase; // Devolverá el valor de connectedDatabase
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Lanza una excepción para que se maneje adecuadamente en otros lugares
    }
});
exports.default = connectDatabase;
//# sourceMappingURL=db.js.map