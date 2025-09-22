# Serverless Backend for the AWS Deployment Lab

This service provides the serverless backend for the project, handling user page data. It's built with the Serverless Framework and runs on AWS Lambda, API Gateway, and DynamoDB.

## Prerequisites

* Node.js and npm
* [Serverless Framework](https://www.serverless.com/framework/docs/getting-started) installed globally (`npm install -g serverless`)
* Configured AWS Credentials on your machine.

## Deployment

To deploy the service to your AWS account, run the following command from this directory (`/backend`):

```bash
# Deploys all resources (Lambda, API Gateway, IAM Roles) to AWS
serverless deploy
```
After deployment, the command line will output the API endpoints that you can use to interact with the service.

## Removing the Service
To remove all deployed resources from your AWS account, run:

```bash
serverless remove
```
