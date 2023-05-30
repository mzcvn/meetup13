# Simple Rest API

## Get started

### If you use Dev Environment

Start local API directly by this command

For Linnux, CodeCatalyst Dev Environment:
`sam local start-api -n dev_linux.json`

For Mac, Windows:
`sam local start-api -n dev.json`

### Run this step if you use local dev environment
#### Create dynamodb DB
`docker run -d -p 8000:8000 --name dynamo-local amazon/dynamodb-local`

#### Create table 

`aws dynamodb create-table --table-name rates --attribute-definitions AttributeName=star,AttributeType=N --key-schema AttributeName=star,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --table-class STANDARD --endpoint-url http://localhost:8000`
