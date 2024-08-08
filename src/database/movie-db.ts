import { batchQuery, query, scan } from '../config/database';

const listMovie = async (movieIds: number[]) => {
  try {
    const stringMovieIds = movieIds.map(String);

    const params = {
      RequestItems: {
        "movie": {
          Keys: stringMovieIds.map(id => ({ id }))
        }
      }
    };
    const rows = await batchQuery(params);
    return rows;
  } catch (err: any) {
    throw new Error('List movie failed: ' + err.message);
  }
}

const getMovie = async (movieId: number) => {
  try {
    const params = {
      TableName: 'movie',
      KeyConditionExpression: 'id = :movieId',
      ExpressionAttributeValues: {
        ':movieId': movieId
      }
    };
    const row = await query(params);
    return row;
  } catch (err: any) {
    throw new Error('Get movie failed: ' + err.message);
  }
}

const listTopRatedMovies = async () => {
  try {
    const params = {
      TableName: 'movie',
      FilterExpression: 'adult = :isAdult',
      ExpressionAttributeValues: {
        ':isAdult': "False"
      }
    };
    const rows = await scan(params);
    return rows;
  } catch (err: any) {
    throw new Error('List top rated movies failed: ' + err.message);
  }
}

export default { listMovie, getMovie, listTopRatedMovies };