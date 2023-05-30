const app = require('../getallitems');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const AWS = require('aws-sdk');

const result = [
  { 'star': 5, 'visits': 1 }
];
let sinonSandbox;

beforeEach((done) => {
  sinonSandbox = sinon.createSandbox();
  done();
});

afterEach((done) => {
  sinonSandbox.restore();
  done();
});

describe('Get All Item', () => {
  it('Should return all items', async () => {
    sinonSandbox.stub(AWS.DynamoDB.DocumentClient.prototype, 'scan').returns({
      promise: function () {
        return Promise.resolve(result);
      }
    });

    const response = await app.lambdaHandler({});
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.equal(JSON.stringify({items: result}));
  });
});
