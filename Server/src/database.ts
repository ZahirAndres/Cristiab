import sql from 'mssql';
import keys from './keys';

let pool: sql.ConnectionPool | undefined;

async function getConnection(): Promise<sql.ConnectionPool | undefined> {
  if (!pool) {
    try {
      pool = await sql.connect(keys.database);
      console.log('DB is connected');
    } catch (err) {
      console.error('Error connecting to the database:', err);
      pool = undefined;
    }
  }
  return pool;
}

export default getConnection;