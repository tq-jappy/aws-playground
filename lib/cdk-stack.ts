import cdk = require('@aws-cdk/cdk');
import dynamodb = require('@aws-cdk/aws-dynamodb');
import { BillingMode, AttributeType } from '@aws-cdk/aws-dynamodb';
// import firehose = require('@aws-cdk/aws-kinesisfirehose');

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'CdkExampleTable', {
      tableName: 'cdk-item',
      billingMode: BillingMode.PayPerRequest,
      ttlAttributeName: 'ttl'
    });
    table.addPartitionKey({ name: 'id', type: AttributeType.String });
    table.addSortKey({ name: 'timestamp', type: dynamodb.AttributeType.Number });

    /*
    const deliveryStream = new firehose.CfnDeliveryStream(this, 'CdkExampleDeliveryStream', {
      deliveryStreamName: 'cdk-delivery-stream',
      deliveryStreamType: 'DirectPut',
      s3DestinationConfiguration: {
        bucketArn: 'xxx',
        roleArn: 'xxx',
        compressionFormat: 'GZIP',
        bufferingHints: {
          intervalInSeconds: 300,
          sizeInMBs: 5
        }
      }
    });
    console.log('Kinesis Firehose', deliveryStream);
    */
  }
}