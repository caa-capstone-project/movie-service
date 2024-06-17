import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'movie-advisor-cluster1-instance-1.cwkoacmpymic.us-east-1.rds.amazonaws.com',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'movieadvisor',
  database: process.env.DB_NAME || 'movie_db',
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || '5')
});

const query = async (query: string, params?: any[]) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(query, params);
    return rows;
  } catch (err: any) {
    throw new Error('Database query failed: ' + err.message);;
  } finally {
    if (conn) conn.end();
  }
}

const execute = async (query: string, params: any[]) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.execute(query, params);
    return rows;
  } catch (err: any) {
    throw new Error('Database execute failed: ' + err.message);;
  } finally {
    if (conn) conn.end();
  }
}

export { query, execute };