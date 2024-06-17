import { query } from '../config/database';

const listMovie = async () => {
  try {
    const rows = await query('SELECT * FROM movie');
    return rows;
  } catch (err: any) {
    throw new Error('List movie failed: ' + err.message);
  }
};


export default { listMovie };