"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControllers_1 = __importDefault(require("../controllers/indexControllers"));
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/registro', indexControllers_1.default.register);
        this.router.post('/login', indexControllers_1.default.login);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
