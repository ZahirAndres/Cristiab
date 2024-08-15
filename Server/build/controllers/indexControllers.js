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
const database_1 = __importDefault(require("../database"));
const mssql_1 = __importDefault(require("mssql"));
class IndexController {
    register(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Usename, Password } = req.body;
            try {
                const pool = yield (0, database_1.default)();
                if (!pool) {
                    resp.status(500).send('No se pudo conectar con la DB');
                    return;
                }
                yield pool.request()
                    .input('Usename', mssql_1.default.VarChar, Usename)
                    .input('Password', mssql_1.default.NVarChar, Password)
                    .query(`INSERT INTO Usuarios (username, password) VALUES (@Usename, HASHBYTES('SHA2_256',@Password))`);
                resp.json({ message: 'Usuario registrado exitosamente' });
            }
            catch (err) {
                console.error(err);
                resp.status(500).send('Error al registrar el usuario');
            }
        });
    }
    login(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Usename, Password } = req.body;
            try {
                const pool = yield (0, database_1.default)();
                if (!pool) {
                    resp.status(500).send('No se pudo conectar con la DB');
                    return;
                }
                const result = yield pool.request()
                    .input('Usename', mssql_1.default.VarChar, Usename)
                    .input('Password', mssql_1.default.VarChar, Password)
                    .query(`SELECT TOP 1 * FROM Usuarios WHERE username = @Usename`);
                if (result.recordset.length > 0) {
                    const user = result.recordset[0];
                    resp.json({ message: 'Inicio de sesión exitoso', userId: user.id });
                }
                else {
                    resp.status(404).send('Usuario no encontrado');
                }
            }
            catch (err) {
                console.error(err);
                resp.status(500).send('Error al iniciar sesión');
            }
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
