import { APIGatewayProxyEvent, APIGatewayProxyResult, SQSEvent } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { expect, describe, it } from '@jest/globals';

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: SQSEvent = {
            Records: [
                {
                    messageId: '1',
                    receiptHandle: 'A',
                    body: JSON.stringify({
                        user: { id: '65e01f93e7373b5698836fc9' },
                        access_token:
                            'eyJraWQiOiItU2pFYkZLSURfVzFCSmlHVlI0ZTQ3MSJ9.flIo5iLUAPp5ds0YWnjrQtqYuwQEAChnuVA4gjgtvpL2YHa0ktwWr5mPGiddHO6TIpRTTHJtW3uuE49MaEly71UvWfez4HrGbl48Eh4zeDP695JiGBLVZqzJFnwSUV1Ft7Gsvh0sORnaQ5-niCx60ySud4nJGoASwXQgd_2Ut2iv5Nh2vJeniVJVy0m7p9sXtKlczPjkAv9XjCz8cwH0Jlz40mPQMpnZIb_U9fdSkPdtSP5Pu48WTaK_OY67awz5U88JIrAQMFWVSGT5m4EMtsM4bu_j7Lr1wykdR3BSzkWx5QGS5gPvcdiiPxeLBR_jIDqPXK_PWa8mz7Kz6n4QKA',
                        list_ids: ['7b6e72b4-5585-11ef-864a-fa163ecbdd18'],
                    }),
                    attributes: {
                        AWSTraceHeader: '',
                        ApproximateReceiveCount: '',
                        SentTimestamp: '',
                        SenderId: '',
                        ApproximateFirstReceiveTimestamp: '',
                        SequenceNumber: '',
                        MessageGroupId: '',
                        MessageDeduplicationId: '',
                        DeadLetterQueueSourceArn: '', // Undocumented, but used by AWS to support their re-drive functionality in the console
                    },
                    messageAttributes: {},
                    md5OfBody: '',
                    md5OfMessageAttributes: '',
                    eventSource: '',
                    eventSourceARN: '',
                    awsRegion: '',
                },
            ],
        };
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(
            JSON.stringify({
                message: 'Demo!',
            }),
        );
    });
});
