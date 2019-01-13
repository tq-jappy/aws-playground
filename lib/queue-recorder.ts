import cdk = require('@aws-cdk/cdk');
import sqs = require('@aws-cdk/aws-sqs');
import lambda = require('@aws-cdk/aws-lambda');
import dynamodb = require('@aws-cdk/aws-dynamodb');
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources';

export interface QueueRecorderProps {
  inputQueue: sqs.Queue;
}

export class QueueRecorder extends cdk.Construct {
  constructor(parent: cdk.Construct, id: string, props: QueueRecorderProps) {
    super(parent, id);

    const table = new dynamodb.Table(this, 'HelloTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.String }
    });

    const fn = new lambda.Function(this, 'HelloFunction', {
      runtime: lambda.Runtime.NodeJS810,
      code: lambda.Code.asset('lambda'),
      handler: 'index.handler'
    });

    fn.addEventSource(new SqsEventSource(props.inputQueue));

    fn.addEnvironment('TABLE_NAME', table.tableName)

    table.grantWriteData(fn.role);
  }
}