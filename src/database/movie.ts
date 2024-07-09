import { scan } from '../config/database';

const listMovie = async () => {
  try {
    const params = {
      TableName: "movie",
      Limit: 10,
      FilterExpression: "#adult = :value",
      ExpressionAttributeNames: {
        "#adult": "adult", // Attribute name alias
      },
      ExpressionAttributeValues: {
        ":value": 'False', // The value to compare against
      },
    };
    const rows = await scan(params);
    return rows;
  } catch (err: any) {
    throw new Error('List movie failed: ' + err.message);
  }
};


export default { listMovie };