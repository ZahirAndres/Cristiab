import { Request, Response } from 'express';
import getConnection from '../database';
import sql from 'mssql';
import bcrypt from 'bcrypt';

class IndexController {
  public async register(req: Request, resp: Response): Promise<void> {
    const { Usename, Password } = req.body;

    try {
      const pool = await getConnection();
      if (!pool) {
        resp.status(500).send('No se pudo conectar con la DB');
        return;
      }

      

      await pool.request()
        .input('Usename', sql.VarChar, Usename)
        .input('Password', sql.NVarChar, Password)
        .query(`INSERT INTO Usuarios (username, password) VALUES (@Usename, HASHBYTES('SHA2_256',@Password))`);

      resp.json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
      console.error(err);
      resp.status(500).send('Error al registrar el usuario');
    }
  }

  public async login(req: Request, resp: Response): Promise<void> {
    const { Usename, Password } = req.body;
  
    try {
      const pool = await getConnection();
      if (!pool) {
        resp.status(500).send('No se pudo conectar con la DB');
        return;
      }
  
      const result = await pool.request()
        .input('Usename', sql.VarChar, Usename)
        .input('Password', sql.VarChar, Password)
        .query(`SELECT TOP 1 * FROM Usuarios WHERE username = @Usename`);
  
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        resp.json({ message: 'Inicio de sesión exitoso', userId: user.id });
      } else {
        resp.status(404).send('Usuario no encontrado');
      }
    } catch (err) {
      console.error(err);
      resp.status(500).send('Error al iniciar sesión');
    }
  }
  
  
}

const indexController = new IndexController();
export default indexController;
