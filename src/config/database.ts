import AWS from 'aws-sdk';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
dotenv.config({ path: envFile });

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN
});

// Create DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient();

// Function to query DynamoDB
const query = async (params: AWS.DynamoDB.DocumentClient.QueryInput) => {
  try {
    const data = await docClient.query(params).promise();
    return data.Items;
  } catch (err: any) {
    throw new Error('DynamoDB query failed: ' + err.message);
  }
};

const batchQuery = async (params: AWS.DynamoDB.DocumentClient.BatchGetItemInput) => {
  try {
    const data = await docClient.batchGet(params).promise();
    return data.Responses;
  } catch (err: any) {
    throw new Error('DynamoDB batch query failed: ' + err.message);
  }
}

// Function to query DynamoDB
const scan = async (params: AWS.DynamoDB.DocumentClient.QueryInput) => {
  try {
    const data = await docClient.scan(params).promise();
    return data.Items;
  } catch (err: any) {
    throw new Error('DynamoDB scan failed: ' + err.message);
  }
};

// Function to put (create or replace) an item in DynamoDB
const put = async (params: AWS.DynamoDB.DocumentClient.PutItemInput) => {
  try {
    await docClient.put(params).promise();
    return { message: 'Put operation successful' };
  } catch (err: any) {
    throw new Error('DynamoDB put failed: ' + err.message);
  }
};

export { query, batchQuery, put, scan };