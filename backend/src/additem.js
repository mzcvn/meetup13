const AWS = require('aws-sdk');

exports.lambdaHandler = async (event, context) => {
  try {
    const itemId = parseInt(event.pathParameters.itemId);

    const params = {
      TableName: process.env.TABLE_NAME,
      Key: {
        'star': itemId
      },

      UpdateExpression: 'SET visits = if_not_exists(visits, :initial) + :num',
      ExpressionAttributeValues: {
        ':num': 1,
        ':initial': 0,
      },
    };

    const docClient = exports.getDynamoDbDocumentClient();
    const response = await docClient.update(params).promise();

    return {
      'statusCode': 200,
      'headers': {
        'Access-Control-Allow-Origin': '*' // Required for CORS support to work
      },
      'body': JSON.stringify({
        item: response
      })
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
