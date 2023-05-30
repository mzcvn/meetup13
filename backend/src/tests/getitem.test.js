const app = require('../getitem');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const AWS = require('aws-sdk');

const result = {
  'star': 1,
  'visits': 1
};
let sinonSandbox;

beforeEach((done) => {
  sinonSandbox = sinon.createSandbox();
  done();
});

afterEach((done) => {
  sinonSandbox.restore();
  done();
});

describe('Get Item', () => {
  it('Should return an item', async () => {
    sinonSandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'get').returns({
      promise: function () {
        return Promise.resolve(result);
      }
    });

    const response = await app.lambdaHandler({ pathParameters: { itemId: 1 } });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.equal(JSON.stringify({item: result}));
  });
});
