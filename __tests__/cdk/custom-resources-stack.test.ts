import {
  expect as expectCDK,
  countResources,
  countResourcesLike
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
          account: '1234567890'
        },
        v2: {
          bot: {
            enabled: true
          },
          botAlias: {
            enabled: true
          },
          botVersion: {
            enabled: true
          },
          botLocale: {
            enabled: true
          },
          intent: {
            enabled: true
          },
          intentPriority: {
            enabled: true
          },
          slot: {
            enabled: true
          },
          slotType: {
            enabled: true
          }
        }
      });
    });

    it('Stack contains children stacks for each resource', () => {
      expectCDK(stack).to(countResources('AWS::CloudFormation::Stack', 8));
    });

    it('Stack contains IAM Policy for Lex V2', () => {
      expectCDK(stack).to(countResourcesLike('AWS::IAM::Policy', 1, {
        PolicyDocument: {
          Statement: [
            {
              Action: [
                "lex:DescribeSlot",
                "lex:ListSlotTypes",
                "lex:UpdateSlot",
                "lex:DescribeBotChannel",
                "lex:DescribeIntent",
                "lex:UpdateBotAlias",
                "lex:DescribeResourcePolicy",
                "lex:DescribeSlotType",
                "lex:DeleteBotVersion",
                "lex:CreateResourcePolicy",
                "lex:DescribeBot",
                "lex:UpdateBotLocale",
                "iam:PassRole",
                "lex:ListBotAliases",
                "lex:DescribeBotAlias",
                "lex:CreateBotLocale",
                "lex:DeleteIntent",
                "lex:ListBotLocales",
                "lex:UpdateSlotType",
                "lex:BuildBotLocale",
                "lex:ListBotChannels",
                "lex:CreateBot",
                "lex:DeleteBotAlias",
                "lex:CreateIntent",
                "lex:ListBotVersions",
                "lex:TagResource",
                "lex:DescribeBotLocale",
                "lex:DeleteBot",
                "lex:CreateBotAlias",
                "lex:CreateSlotType",
                "lex:ListTagsForResource",
                "lex:ListIntents",
                "lex:DeleteBotLocale",
                "lex:UpdateExport",
                "lex:UpdateResourcePolicy",
                "lex:DeleteBotChannel",
                "lex:CreateSlot",
                "lex:DeleteSlot",
                "lex:UpdateBot",
                "lex:CreateBotChannel",
                "lex:DeleteSlotType",
                "lex:CreateBotVersion",
                "lex:DescribeBotVersion",
                "lex:UpdateIntent",
                "lex:UntagResource",
                "lex:ListSlots",
                "lex:DeleteResourcePolicy",
                "lex:ListBots"
              ]
            }
          ]
        }
      }));
    });

    it('Stack contains IAM Role for Lex V2', () => {
      expectCDK(stack).to(countResources('AWS::IAM::Role', 1));
    });
  });
});
