# Lambda with SQS Trigger Using AWS SAM

This project contains source code and supporting files for a serverless application that processes messages from an SQS queue using an AWS Lambda function written in TypeScript. The project is managed and deployed using the AWS Serverless Application Model (SAM). The key resources included are Lambda functions, SQS queues, and relevant IAM roles.

## Project Structure

- **src** - Code for the application's Lambda function written in TypeScript.
- **events** - Sample invocation events that you can use to test the function locally.
- **src/tests** - Unit tests for the application code using the Jest framework.
- **template.yaml** - The SAM template that defines the application's AWS resources.

## Deploying the Application

To deploy the application using the SAM CLI, you need to have the following tools installed:

- **SAM CLI** - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- **Node.js** - [Install Node.js 18](https://nodejs.org/en/), including the NPM package management tool.
- **Docker** - [Install Docker Community Edition](https://hub.docker.com/search/?type=edition&offering=community)

### Deployment Steps

1. **Build the Project:**

   ```bash
   sam build --beta-features
   ```

   This command compiles your TypeScript code, installs dependencies, and prepares the application for deployment.

2. **Deploy the Project:**

   ```bash
   sam deploy --guided
   ```

   During deployment, SAM will prompt you for the following:

   - **Stack Name:** A unique name for your CloudFormation stack.
   - **AWS Region:** The region where you want to deploy your application.
   - **Confirm changes before deploy:** Review changes before deploying.
   - **Allow SAM CLI IAM role creation:** Allow SAM to create IAM roles needed for the Lambda function.
   - **Save arguments to samconfig.toml:** Save your deployment settings to `samconfig.toml` for future deployments.

### Environments

This project supports multiple deployment environments: development, staging, and production. The environment-specific configurations are managed via environment variables.

To add environment variables, rename the `.env.example` to `.env` and add your project specific variables.


To deploy to a specific environment, use the corresponding Makefile target.

1. **Development Environment:**

    ```bash
    make dev
    ```

2. **Staging Environment:**

    ```bash
    make stg
    ```

3. **Production Environment:**

    ```bash
    make prod
    ```

## Local Development and Testing

1. **Build the Project Locally:**

    ```bash
    sam build     #This command installs dependencies and compiles your TypeScript code.

    ```

2. **Invoke the Function Locally with SQS Event:**

    ```bash
    sam local invoke DemoServiceFunction --event events/event.json
    ```

3. **Tail Lambda Function Logs:**

    ```bash
    sam logs -n DemoServiceFunction --stack-name DemoService --tail
    ```

## Unit Tests

Unit tests are defined in the `src/tests` folder using the Jest framework. 

1. **To Run the Tests:**

    ```bash
    cd src
    npm install
    npm run test
    ```

## Cleanup

1. **To Delete the Deployed Application:**

    ```bash
    sam delete --stack-name DemoService
    ```

This command will remove all resources associated with the stack.

## Resources

- [AWS SAM Developer Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) - Comprehensive guide to using SAM.
- [AWS Serverless Application Repository](https://aws.amazon.com/serverless/serverlessrepo/) - Explore and deploy pre-built serverless applications.