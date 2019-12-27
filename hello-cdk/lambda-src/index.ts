import { DynamoDB } from 'aws-sdk';

exports.handler = async (event: any) => {
  console.log(JSON.stringify(event, undefined, 2));

  const client = new DynamoDB.DocumentClient();

  for (const record of event.Records) {
    const body = record.body ? JSON.parse(record.body) : {};

    await client
      .put({
        TableName: process.env.TABLE_NAME || '',
        Item: {
          id: record.messageId,
          text: body.text,
          body
        }
      })
      .promise();
  }
};
