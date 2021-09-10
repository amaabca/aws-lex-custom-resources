/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from '@aws-cdk/aws-iam';
import { Runtime } from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';

import { CustomResourceBaseStack } from './custom-resource-base-stack';

interface CustomResourceBaseStackProps {
  enabled: boolean;
  stackName?: string;
  exportName?: string;
  folder?: string;
  handlerName?: string;
  timeout?: number;
  environment?: {
    [key: string]: string;
  };
  runtime?: Runtime;
  role?: {
    parentResource?: string;
    childResource?: string;
    actions?: string[];
    customRole?: Role;
  };
}

interface CustomResourcesStackProps {
  env?: cdk.Environment;
  roleOutput?: string;
  bot?: CustomResourceBaseStackProps;
  intent?: CustomResourceBaseStackProps;
  slotType?: CustomResourceBaseStackProps;
  slot?: CustomResourceBaseStackProps;
  intentPriority?: CustomResourceBaseStackProps;
  botLocale?: CustomResourceBaseStackProps;
  botVersion?: CustomResourceBaseStackProps;
  botAlias?: CustomResourceBaseStackProps;
}

export class CustomResourcesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CustomResourcesStackProps) {
    super(scope, id, props);

    const handlerEnvConfig = {
      RETRIES: '40',
      WAIT_TIME: '2000',
    };

    if (props) {
      // Role here
      const handlerRole = new Role(this, 'LexCustomLambdaRole', {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com').grantPrincipal,
      });

      handlerRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
      handlerRole.addToPolicy(
        new PolicyStatement({
          actions: [
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
          resources: [`arn:aws:lex:${props.env!.region}:${props.env!.account}:*`],
        }),
      );

      handlerRole.addToPolicy(
        new PolicyStatement({
          actions: ['iam:PassRole'],
          resources: [`arn:aws:iam::${props.env!.account}:role/*`],
        }),
      );

      new cdk.CfnOutput(this, 'LexRole', {
        value: handlerRole.roleArn,
        exportName: props.roleOutput || 'LexRole',
      });

      if (props.bot) {
        new CustomResourceBaseStack(this, props.bot.stackName || 'LexBotCustomResourcesStack', props.env!, {
          exportName: props.bot.exportName || 'LexBotProviderServiceToken',
          handler: {
            folder: props.bot.folder || `${__dirname}/../../handlers/lex-bot`,
            handlerName: props.bot.handlerName || 'handler',
            entry: 'index.js',
            timeout: props.bot.timeout || 120,
            environment: props.bot.environment || handlerEnvConfig,
            runtime: props.bot.runtime || Runtime.NODEJS_14_X,
          },
          role: handlerRole,
        });
      }

      if (props.intent) {
        new CustomResourceBaseStack(this, props.intent.stackName || 'LexIntentCustomResourcesStack', props.env!, {
          exportName: props.intent.exportName || 'LexIntentProviderServiceToken',
          handler: {
            folder: props.intent.folder || `${__dirname}/../../handlers/lex-intent`,
            handlerName: props.intent.handlerName || 'handler',
            entry: 'index.js',
            timeout: props.intent.timeout || 120,
            environment: props.intent.environment || handlerEnvConfig,
            runtime: props.intent.runtime || Runtime.NODEJS_14_X,
          },
          role: handlerRole,
        });
      }

      if (props.botLocale) {
        new CustomResourceBaseStack(
          this,
          props.botLocale.stackName || 'LexBotLocaleCustomResourcesStack',
          props.env!,
          {
            exportName: props.botLocale.exportName || 'LexBotLocaleProviderServiceToken',
            handler: {
              folder: props.botLocale.folder || `${__dirname}/../../handlers/lex-bot-locale`,
              handlerName: props.botLocale.handlerName || 'handler',
              entry: 'index.js',
              timeout: props.botLocale.timeout || 120,
              environment: props.botLocale.environment || handlerEnvConfig,
              runtime: props.botLocale.runtime || Runtime.NODEJS_14_X,
            },
            role: handlerRole,
          },
        );
      }

      if (props.botVersion) {
        new CustomResourceBaseStack(
          this,
          props.botVersion.stackName || 'LexBotVersionCustomResourcesStack',
          props.env!,
          {
            exportName: props.botVersion.exportName || 'LexBotVersionProviderServiceToken',
            handler: {
              folder: props.botVersion.folder || `${__dirname}/../../handlers/lex-bot-version`,
              handlerName: props.botVersion.handlerName || 'handler',
              entry: 'index.js',
              timeout: props.botVersion.timeout || 120,
              environment: props.botVersion.environment || handlerEnvConfig,
              runtime: props.botVersion.runtime || Runtime.NODEJS_14_X,
            },
            role: handlerRole,
          },
        );
      }

      if (props.slotType) {
        new CustomResourceBaseStack(
          this,
          props.slotType.stackName || 'LexSlotTypeCustomResourcesStack',
          props.env!,
          {
            exportName: props.slotType.exportName || 'LexSlotTypeProviderServiceToken',
            handler: {
              folder: props.slotType.folder || `${__dirname}/../../handlers/lex-slot-type`,
              handlerName: props.slotType.handlerName || 'handler',
              entry: 'index.js',
              timeout: props.slotType.timeout || 120,
              environment: props.slotType.environment || handlerEnvConfig,
              runtime: props.slotType.runtime || Runtime.NODEJS_14_X,
            },
            role: handlerRole,
          },
        );
      }

      if (props.slot) {
        new CustomResourceBaseStack(this, props.slot.stackName || 'LexSlotCustomResourcesStack', props.env!, {
          exportName: props.slot.exportName || 'LexSlotProviderServiceToken',
          handler: {
            folder: props.slot.folder || `${__dirname}/../../handlers/lex-slot`,
            handlerName: props.slot.handlerName || 'handler',
            entry: 'index.js',
            timeout: props.slot.timeout || 120,
            environment: props.slot.environment || handlerEnvConfig,
            runtime: props.slot.runtime || Runtime.NODEJS_14_X,
          },
          role: handlerRole,
        });
      }

      if (props.botAlias) {
        new CustomResourceBaseStack(
          this,
          props.botAlias.stackName || 'LexBotAliasCustomResourcesStack',
          props.env!,
          {
            exportName: props.botAlias.exportName || 'LexBotAliasProviderServiceToken',
            handler: {
              folder: props.botAlias.folder || `${__dirname}/../../handlers/lex-bot-alias`,
              handlerName: props.botAlias.handlerName || 'handler',
              entry: 'index.js',
              timeout: props.botAlias.timeout || 120,
              environment: props.botAlias.environment || handlerEnvConfig,
              runtime: props.botAlias.runtime || Runtime.NODEJS_14_X,
            },
            role: handlerRole,
          },
        );
      }

      if (props.intentPriority) {
        new CustomResourceBaseStack(
          this,
          props.intentPriority.stackName || 'LexIntentPriorityCustomResourcesStack',
          props.env!,
          {
            exportName: props.intentPriority.exportName || 'LexBotIntentPriorityProviderServiceToken',
            handler: {
              folder: props.intentPriority.folder || `${__dirname}/../../handlers/lex-intent-priority`,
              handlerName: props.intentPriority.handlerName || 'handler',
              entry: 'index.js',
              timeout: props.intentPriority.timeout || 120,
              environment: props.intentPriority.environment || handlerEnvConfig,
              runtime: props.intentPriority.runtime || Runtime.NODEJS_14_X,
            },
            role: handlerRole,
          },
        );
      }
    }
  }
}
