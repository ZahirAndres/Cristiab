import { Request, Response } from 'express';
import getConnection from '../database';
import sql from 'mssql';

interface SqlError extends Error {
  code?: string;
  originalError?: {
    number?: number;
    message?: string;
  };
}

class IndexController {
  public async index(req: Request, resp: Response): Promise<void> {
   
      const pool = await getConnection();
      if (!pool) {
        resp.status(500).send('No se pudo conectar a la base de datos');
        return;
      }

      const result = await pool.request().query('SELECT * FROM Usuarios');
      resp.json(result.recordset);
   
  }

  public async validateUser(req: Request, res: Response): Promise<void> {
    const { Usename, Password, ID } = req.body;
  
    try {
      const pool = await getConnection();
      if (!pool) {
        res.status(500).send('No se pudo conectar con la base de datos');
        return;
      }
  
      let query = `SELECT ID FROM tbl_User WHERE Usename = @Usename AND Password = HASHBYTES('SHA2_256', @Password)`

      const params: { [key: string]: any } = { Password };
  
      if (ID) {
        query += ' AND ID = @ID';
        params.ID = ID;
      } else if (Usename) {
        query += ' AND Usename = @Usename';
        params.Usename = Usename;
      }
  
      const result = await pool.request()
        .input('Password', sql.NVarChar, Password)
        .input('Usename', sql.VarChar, params.Usename)
        .input('ID', sql.Int, params.ID)
        .query(query);
  
      if (result.recordset.length > 0) {
        res.json(result.recordset[0]);
      } else {
        res.status(404).send('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en la consulta');
    }
  }
  
  public async create(req: Request, resp: Response): Promise<void> {
    const { Usename, Password } = req.body;

    try {
      const pool = await getConnection();
      if (!pool) {
        resp.status(500).send('No se pudo conectar con la DB');
        return;
      }

      await pool.request()
        .input('accion', sql.VarChar, 'insertar')
        .input('Usename', sql.VarChar, Usename)
        .input('Password', sql.NVarChar, Password)
        .execute('upAdmonUsuario');

      resp.json({ message: 'Usuario insertado' });
    } catch (err) {
      const sqlErr = err as SqlError;

      if (sqlErr.originalError && sqlErr.originalError.message && sqlErr.originalError.message.includes('El usuario ya existe')) {
        resp.status(400).send('El usuario ya existe');
      } else {
        resp.status(500).send('Error al crear el usuario');
      }
    }
  }

  public async getIdByUsername(req: Request, resp: Response): Promise<void> {
    const { username } = req.params;

    try {
      const pool = await getConnection();
      if (!pool) {
        resp.status(500).send('No se pudo conectar con la base de datos');
        return;
      }

      const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT ID FROM tbl_User WHERE Usename = @username');

      if (result.recordset.length > 0) {
        resp.json(result.recordset[0]);
      } else {
        resp.status(404).send('Usuario no encontrado');
      }
    } catch (err) {
      console.error(err);
      resp.status(500).send('Error en la consulta');
    }
  }

  public async update(req: Request, resp: Response): Promise<void> {
    const { Password } = req.body;
    const { ID } = req.params;
  
    try {
      const pool = await getConnection();
      if (!pool) {
        resp.status(500).send('No se pudo conectar con la DB');
        return;
      }
  
      const result = await pool.request()
        .input('accion', sql.VarChar, 'actualizar')
        .input('ID', sql.Int, ID)
        .input('Password', sql.NVarChar, Password)
        .execute('upAdmonUsuario');
  
      if (result.rowsAffected[0] > 0) {
        resp.json({ message: 'Usuario actualizado' });
      } else {
        resp.status(404).send('Usuario no encontrado');
      }
    } catch (err) {
      console.error(err);
      resp.status(500).send('Error en la consulta');
    }
  }
  
 
  public async delete(req: Request, resp: Response): Promise<void> {
    const { ID } = req.params;

    try {
      const pool = await getConnection();
      if (!pool) {
        resp.status(500).send('No se pudo conectar con la DB');
        return;
      }

      await pool.request()
        .input('accion', sql.VarChar, 'eliminar')
        .input('ID', sql.Int, ID)
        .execute('upAdmonUsuario');

      resp.json({ message: 'Usuario eliminado' });
    } catch (err) {
      console.error(err);
      resp.status(500).send('Error en la consulta');
    }
  }
}

const indexController = new IndexController();
export default indexController;
