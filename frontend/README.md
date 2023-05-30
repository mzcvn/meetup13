# Landing Page for CodeCatalyst Demo

## Before you start

Run `npm install` to install dependency. This step can be skip if you use CodeCatalyst Dev Environments

## Instruction

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run lint`

Run linter

### `npm test`

Run test

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## To get your app interact with API

### Create another Dev environment with backend repo and run this command
`sam local start-api --docker-network local-api-network -n dev.json -p 3001`

### Or change the endpoint in application/.env file, default is 
`http://localhost:3001`