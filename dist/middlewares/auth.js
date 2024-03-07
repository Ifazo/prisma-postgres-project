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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "You are unauthorized" });
        }
        const verifiedUser = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret_key);
        req.user = verifiedUser;
        if (roles.length && !roles.includes(verifiedUser.role)) {
            return res
                .status(401)
                .json({ success: false, message: "Forbidden user" });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
});
exports.default = auth;
