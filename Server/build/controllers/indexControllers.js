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
    index(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield (0, database_1.default)();
            if (!pool) {
                resp.status(500).send('No se pudo conectar a la base de datos');
                return;
            }
            const result = yield pool.request().query('SELECT * FROM Usuarios');
            resp.json(result.recordset);
        });
    }
    validateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Usename, Password, ID } = req.body;
            try {
                const pool = yield (0, database_1.default)();
                if (!pool) {
                    res.status(500).send('No se pudo conectar con la base de datos');
                    return;
                }
                let query = `SELECT ID FROM tbl_User WHERE Usename = @Usename AND Password = HASHBYTES('SHA2_256', @Password)`;
                const params = { Password };
                if (ID) {
                    query += ' AND ID = @ID';
                    params.ID = ID;
                }
                else if (Usename) {
                    query += ' AND Usename = @Usename';
                    params.Usename = Usename;
                }
                const result = yield pool.request()
                    .input('Password', mssql_1.default.NVarChar, Password)
                    .input('Usename', mssql_1.default.VarChar, params.Usename)
                    .input('ID', mssql_1.default.Int, params.ID)
                    .query(query);
                if (result.recordset.length > 0) {
                    res.json(result.recordset[0]);
                }
                else {
                    res.status(404).send('Usuario o contraseña incorrectos');
                }
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Error en la consulta');
            }
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Usename, Password } = req.body;
            try {
                const pool = yield (0, database_1.default)();
                if (!pool) {
                    resp.status(500).send('No se pudo conectar con la DB');
                    return;
                }
                yield pool.request()
                    .input('accion', mssql_1.default.VarChar, 'insertar')
                    .input('Usename', mssql_1.default.VarChar, Usename)
                    .input('Password', mssql_1.default.NVarChar, Password)
                    .execute('upAdmonUsuario');
                resp.json({ message: 'Usuario insertado' });
            }
            catch (err) {
                const sqlErr = err;
                if (sqlErr.originalError && sqlErr.originalError.message && sqlErr.originalError.message.includes('El usuario ya existe')) {
                    resp.status(400).send('El usuario ya existe');
                }
                else {
                    resp.status(500).send('Error al crear el usuario');
                }
            }
        });
    }
    getIdByUsername(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            try {
                const pool = yield (0, database_1.default)();
                if (!pool) {
                    resp.status(500).send('No se pudo conectar con la base de datos');
                    return;
                }
                const result = yield pool.request()
                    .input('username', mssql_1.default.VarChar, username)
                    .query('SELECT ID FROM tbl_User WHERE Usename = @username');
                if (result.recordset.length > 0) {
                    resp.json(result.recordset[0]);
                }
                else {
                    resp.status(404).send('Usuario no encontrado');
                }
            }
            catch (err) {
                console.error(err);
                resp.status(500).send('Error en la consulta');
            }
        });
    }
    update(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Password } = req.body;
            const { ID } = req.params;
            try {
                const pool = yield (0, database_1.default)();
                if (!pool) {
                    resp.status(500).send('No se pudo conectar con la DB');
                    return;
                }
                const result = yield pool.request()
                    .input('accion', mssql_1.default.VarChar, 'actualizar')
                    .input('ID', mssql_1.default.Int, ID)
                    .input('Password', mssql_1.default.NVarChar, Password)
                    .execute('upAdmonUsuario');
                if (result.rowsAffected[0] > 0) {
                    resp.json({ message: 'Usuario actualizado' });
                }
                else {
                    resp.status(404).send('Usuario no encontrado');
                }
            }
            catch (err) {
                console.error(err);
                resp.status(500).send('Error en la consulta');
            }
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ID } = req.params;
            try {
                const pool = yield (0, database_1.default)();
                if (!pool) {
                    resp.status(500).send('No se pudo conectar con la DB');
                    return;
                }
                yield pool.request()
                    .input('accion', mssql_1.default.VarChar, 'eliminar')
                    .input('ID', mssql_1.default.Int, ID)
                    .execute('upAdmonUsuario');
                resp.json({ message: 'Usuario eliminado' });
            }
            catch (err) {
                console.error(err);
                resp.status(500).send('Error en la consulta');
            }
        });
    }
}
const indexController = new IndexController();
exports.default = indexController;
