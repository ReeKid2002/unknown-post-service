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
const axios_1 = __importDefault(require("axios"));
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        const jwtToken = authorization.split(' ')[1];
        if (!jwtToken) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        const response = yield axios_1.default.post('http://localhost:5050/api/auth/validate', {
            token: jwtToken,
        });
        if (!response || !response.data) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        req.token = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.payload) !== null && _b !== void 0 ? _b : '';
        next();
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
    }
});
const getUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const token = req.token;
        if (!token) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        console.log(token);
        const response = yield axios_1.default.get(`http://localhost:5050/api/auth/user/${token}`); // TODO: Move url to env
        if (!response || !response.data) {
            return res.status(401).json({
                message: 'Authentication failed',
            });
        }
        req.user = (_d = (_c = response.data) === null || _c === void 0 ? void 0 : _c.payload) !== null && _d !== void 0 ? _d : {};
        console.log(response);
        next();
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
    }
});
exports.default = {
    validateUser,
    getUserDetails,
};
