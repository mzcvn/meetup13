const AWS = require('aws-sdk');
exports.lambdaHandler = async (event) => {
  try {
    const itemId = parseInt(event.pathParameters.itemId);

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        'star': itemId
      }
    };

    const docClient = exports.getDynamoDbDocumentClient();
    const response = await docClient.get(params).promise();
    
    return {
      'statusCode': 200,
      'body': JSON.stringify({
        item: response
      }),
      'headers': {
        'Access-Control-Allow-Origin': '*' // Required for CORS support to work
      },
    };
  } catch (err) {
    console.log(err);
    return {
      'statusCode': 500
    };
  }
};

exports.getDynamoDbDocumentClient = () => {
  if (process.env.USE_LOCAL_DYNAMODB === 'true') {
    return new AWS.DynamoDB.DocumentClient({ 'endpoint': process.env.LOCAL_DB_ENDPOINT });
  } else {
    return new AWS.DynamoDB.DocumentClient();
  }
};
