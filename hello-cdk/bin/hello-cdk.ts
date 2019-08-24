#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { SqsSnsStack } from '../lib/sqs-sns-stack';

const app = new cdk.App();
new SqsSnsStack(app, 'HelloSqsSns');
