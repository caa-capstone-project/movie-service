import { batchQuery, query, scan } from '../config/database';

const listLink = async (movieIds: number[]) => {
  try {
    const params = {
      RequestItems: {
        "link": {
          Keys: movieIds.map(id => ({ movieId: id }))
        }
      }
    };
    const rows = await batchQuery(params);
    return rows;
  } catch (err: any) {
    throw new Error('List link failed: ' + err.message);
  }
}

const getLink = async (movieId: number) => {
  try {
    const params = {
      TableName: 'link',
      KeyConditionExpression: 'movieId = :movieId',
      ExpressionAttributeValues: {
        ':movieId': movieId
      }
    };
    const row = await query(params);
    return row;
  } catch (err: any) {
    throw new Error('Get link failed: ' + err.message);
  }
}

export default { listLink, getLink };
