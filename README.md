# Serverless Comment System

A simple example application for providing a comment system that is hosted serverlessly in AWS.

It uses Appsync to send and recieve comments about a blog from DynamoDB. It also subscribes to updates so that when new comments are posted by other user, they are automatically pushed out to other viewers.

## Back-end

The AWS application can be created using the Cloudformation template in `aws-back-end/cloudformation-template.json`.

The stack can be created using the following command, replacing the necessary sections:
``` powershell
aws cloudformation create-stack `
  --profile <PROFILE_NAME> `
  --region <REGION> `
  --stack-name blog-comments `
  --capabilities 'CAPABILITY_IAM' `
  --template-body file://cloudformation-template.json
```

The output of this template provides the API key and Appsync URL that will need to be added to the front-end application. These values will need to be replaced in `front-end/src/index.js` where the placeholders are.

## Front-end

A simple React application demostrates the ability to add comments to a single blog.

The code is in the `front-end` folder and was created using `create-react-app`. It can be started with `npm start` and built with `npm run build` from with the `front-end` folder.
