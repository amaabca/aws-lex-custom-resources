import {
  expect as expectCDK,
  countResources
} from '@aws-cdk/assert';
import { Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { InlineCode, Runtime } from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { CustomResourceBaseStack } from '../../src/lex-custom-cdk-resources';


describe('CDK Custom Resources Base Stack', () => {
  describe('Can create the default stack', () => {
    let app: cdk.App;
    let stack: cdk.Stack;
    let nestedStack: cdk.NestedStack;

    beforeAll(() => {
      app = new cdk.App();

      stack = new cdk.Stack(app, 'SampleCustomResourcesStack', {
        env: {
          region: 'us-east-1',
          account: '1234567890'
        }
      });

      nestedStack = new CustomResourceBaseStack(stack, 'SampleBaseStack',
        {
          region: 'us-east-1',
          account: '1234567890'
        }, {
        exportName: "SampleExportName",
        role: new Role(stack, 'SampleRole', {
          assumedBy: new ServicePrincipal('lambda.amazonaws.com').grantPrincipal
        }),
        handler: {
          handlerName: "handler",
          code: new InlineCode(`
            def handler(event, context):
              return event
          `),
          timeout: 5,
          environment: {},
          runtime: Runtime.PYTHON_3_8
        }
      })
    });

    it('Succeeds in building custom handler', () => {
      expectCDK(nestedStack).to(countResources("AWS::Lambda::Function", 2));
    });
  });
});
