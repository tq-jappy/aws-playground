import cdk = require('@aws-cdk/core');
import firehose = require('@aws-cdk/aws-kinesisfirehose');

export interface S3FirehoseProps {
  bucketArn: string;
  roleArn: string;
}

export class S3Firehose extends cdk.Construct {
  constructor(parent: cdk.Construct, id: string, props: S3FirehoseProps) {
    super(parent, id);

    const deliveryStream = new firehose.CfnDeliveryStream(
      this,
      'CdkExampleDeliveryStream',
      {
        deliveryStreamName: 'cdk-delivery-stream',
        deliveryStreamType: 'DirectPut',
        s3DestinationConfiguration: {
          bucketArn: props.bucketArn,
          roleArn: props.roleArn,
          compressionFormat: 'GZIP',
          bufferingHints: {
            intervalInSeconds: 300,
            sizeInMBs: 5
          }
        }
      }
    );
    console.log('Kinesis Firehose', deliveryStream);
  }
}
