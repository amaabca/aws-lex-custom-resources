import {
  countResources,
  countResourcesLike,
  expect as expectCDK,
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';

import { CustomResourcesStack } from '../../src/lex-custom-cdk-resources';

describe('CDK Custom Resources Stack', () => {
  describe('Can create the default stack', () => {
    let app: cdk.App;
    let stack: cdk.Stack;

    beforeAll(() => {
      app = new cdk.App();
      stack = new CustomResourcesStack(app, 'SampleCustomResourcesStack', {
        env: {
          region: 'us-east-1',
          account: '1234567890',
        },
        bot: {
          enabled: true,
        },
        botAlias: {
          enabled: true,
        },
        botVersion: {
          enabled: true,
        },
        botLocale: {
          enabled: true,
        },
        intent: {
          enabled: true,
        },
        intentPriority: {
          enabled: true,
        },
        slot: {
          enabled: true,
        },
        slotType: {
          enabled: true,
        },
      });
    });

    it('Stack contains children stacks for each resource', () => {
      expectCDK(stack).to(countResources('AWS::CloudFormation::Stack', 8));
    });

    it('Stack contains IAM Policy for Lex V2', () => {
      expectCDK(stack).to(
        countResourcesLike('AWS::IAM::Policy', 1, {
          PolicyDocument: {
            Statement: [
              {
                Action: [
                  'lex:BuildBotLocale',
                  'lex:CreateBot',
                  'lex:CreateBotAlias',
                  'lex:CreateBotChannel',
                  'lex:CreateBotLocale',
                  'lex:CreateBotVersion',
                  'lex:CreateIntent',
                  'lex:CreateResourcePolicy',
                  'lex:CreateSlot',
                  'lex:CreateSlotType',
                  'lex:DeleteBot',
                  'lex:DeleteBotAlias',
                  'lex:DeleteBotChannel',
                  'lex:DeleteBotLocale',
                  'lex:DeleteBotVersion',
                  'lex:DeleteIntent',
                  'lex:DeleteResourcePolicy',
                  'lex:DeleteSlot',
                  'lex:DeleteSlotType',
                  'lex:DescribeBot',
                  'lex:DescribeBotAlias',
                  'lex:DescribeBotChannel',
                  'lex:DescribeBotLocale',
                  'lex:DescribeBotVersion',
                  'lex:DescribeIntent',
                  'lex:DescribeResourcePolicy',
                  'lex:DescribeSlot',
                  'lex:DescribeSlotType',
                  'lex:ListBotAliases',
                  'lex:ListBotChannels',
                  'lex:ListBotLocales',
                  'lex:ListBotVersions',
                  'lex:ListBots',
                  'lex:ListIntents',
                  'lex:ListSlotTypes',
                  'lex:ListSlots',
                  'lex:ListTagsForResource',
                  'lex:TagResource',
                  'lex:UntagResource',
                  'lex:UpdateBot',
                  'lex:UpdateBotAlias',
                  'lex:UpdateBotLocale',
                  'lex:UpdateExport',
                  'lex:UpdateIntent',
                  'lex:UpdateResourcePolicy',
                  'lex:UpdateSlot',
                  'lex:UpdateSlotType',
                ],
              },
            ],
          },
        }),
      );
    });

    it('Stack contains IAM Role for Lex V2', () => {
      expectCDK(stack).to(countResources('AWS::IAM::Role', 1));
    });
  });
});
