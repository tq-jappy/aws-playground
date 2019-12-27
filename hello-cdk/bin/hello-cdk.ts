#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { SqsSnsStack } from '../lib/sqs-sns-stack';
import { SqsToDynamoDbStack } from '../lib/sqs-to-dynamodb';

const app = new cdk.App();
const sqsSnsStack = new SqsSnsStack(app, 'SqsSnsStack');
new SqsToDynamoDbStack(app, 'HelloCDK', { inputQueue: sqsSnsStack.queue });
