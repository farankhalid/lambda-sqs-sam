import { APIGatewayProxyResult, SQSEvent } from 'aws-lambda';
import { MongoClient } from 'mongodb';
import { SQSClient, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import 'dotenv/config';

let cachedDb: any = null;
let sqsClient: SQSClient | null = null;

const connectSqs = async () => {
    if (sqsClient) {
        return sqsClient;
    }
    const client = new SQSClient({
        region: process.env.AWS_REGION || 'us-east-1',
    });
    sqsClient = client;
    return client;
};

const connectToDatabase = async () => {
    if (cachedDb) {
        return cachedDb;
    }
    const client = new MongoClient(process.env.MONGODB_URI || '');
    await client.connect();
    const db = client.db();
    cachedDb = db;
    return db;
};

const QueueWorker = async (data: any, receiptHandle: string) => {
    try {
        let queue_body = data;
        console.log('Processing message:', queue_body);

        // Your business logic goes here

        const deleteParams = {
            QueueUrl: process.env.SQS_QUEUE_URL || '',
            ReceiptHandle: receiptHandle,
        };
        const deleteCommand = new DeleteMessageCommand(deleteParams);
        await sqsClient?.send(deleteCommand);

        console.log('Message deleted successfully');
    } catch (e) {
        console.error('Error processing message:', e);
    }
};

export const lambdaHandler = async (event: SQSEvent): Promise<APIGatewayProxyResult> => {
    try {
        await connectSqs();
        await connectToDatabase();

        for (const message of event.Records) {
            await QueueWorker(JSON.parse(message.body), message.receiptHandle);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Done!',
            }),
        };
    } catch (err) {
        console.error('Error in lambdaHandler:', err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'An error occurred.',
            }),
        };
    }
};
