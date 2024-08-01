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
        this.router.get('/', indexControllers_1.default.index);
        this.router.post('/validate', indexControllers_1.default.validateUser);
        this.router.get('/id/:username', indexControllers_1.default.getIdByUsername);
        this.router.post('/registro', indexControllers_1.default.create);
        this.router.put('/update/:ID', indexControllers_1.default.update);
        this.router.delete('/:ID', indexControllers_1.default.delete);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
