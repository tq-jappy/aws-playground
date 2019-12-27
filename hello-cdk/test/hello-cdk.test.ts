import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import { SqsSnsStack } from '../lib/sqs-sns-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new SqsSnsStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {}
      },
      MatchStyle.EXACT
    )
  );
});
