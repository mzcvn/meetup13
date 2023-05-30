const app = require('../additem');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const AWS = require('aws-sdk');

const result = {
  // your result
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
describe('Add item', () => {
  it('Should return add item', async () => {
    sinonSandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'update').returns({
      promise: function () {
        return Promise.resolve(result);
      }
    });

    const response = await app.lambdaHandler({ pathParameters: { itemId: 1 } });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.equal(JSON.stringify({item: result}));
  });
});