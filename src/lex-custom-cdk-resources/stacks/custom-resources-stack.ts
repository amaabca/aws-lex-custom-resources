import * as cdk from '@aws-cdk/core';
import { CustomResourceBaseStack } from './custom-resource-base-stack';
import { Role, ServicePrincipal, PolicyStatement, ManagedPolicy } from '@aws-cdk/aws-iam';
import { Runtime } from '@aws-cdk/aws-lambda';

interface CustomResourceBaseStackProps {
  enabled: boolean,
  stackName?: string,
  exportName?: string,
  folder?: string,
  handlerName?: string,
  timeout?: number,
  environment?: {
    [key: string]: string
  },
  runtime?: Runtime,
  role?: {
    parentResource?: string,
    childResource?: string,
    actions?: string[],
    customRole?: Role
  },
}

interface CustomResourcesStackProps {
  env?: cdk.Environment,
  v2?: {
    roleOutput?: string,
    bot?: CustomResourceBaseStackProps,
    intent?: CustomResourceBaseStackProps,
    slotType?: CustomResourceBaseStackProps,
    slot?: CustomResourceBaseStackProps,
    intentPriority?: CustomResourceBaseStackProps,
    botLocale?: CustomResourceBaseStackProps,
    botVersion?: CustomResourceBaseStackProps,
    botAlias?: CustomResourceBaseStackProps
  }
}

export class CustomResourcesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: CustomResourcesStackProps) {
    super(scope, id, props);

    const handlerEnvConfig = {
      RETRIES: "40",
      WAIT_TIME: "2000"
    }

    if (props.v2) {
      //V2 Role here
      const handlerRole = new Role(this, `v2LexCustomLambdaRole`, {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com').grantPrincipal
      });

      handlerRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));
      handlerRole.addToPolicy(new PolicyStatement({
        actions: [
          "lex:BuildBotLocale",
          "lex:CreateBot",
          "lex:CreateBotAlias",
          "lex:CreateBotChannel",
          "lex:CreateBotLocale",
          "lex:CreateBotVersion",
          "lex:CreateIntent",
          "lex:CreateResourcePolicy",
          "lex:CreateSlot",
          "lex:CreateSlotType",
          "lex:DeleteBot",
          "lex:DeleteBotAlias",
          "lex:DeleteBotChannel",
          "lex:DeleteBotLocale",
          "lex:DeleteBotVersion",
          "lex:DeleteIntent",
          "lex:DeleteResourcePolicy",
          "lex:DeleteSlot",
          "lex:DeleteSlotType",
          "lex:DescribeBot",
          "lex:DescribeBotAlias",
          "lex:DescribeBotChannel",
          "lex:DescribeBotLocale",
          "lex:DescribeBotVersion",
          "lex:DescribeIntent",
          "lex:DescribeResourcePolicy",
          "lex:DescribeSlot",
          "lex:DescribeSlotType",
          "lex:ListBotAliases",
          "lex:ListBotChannels",
          "lex:ListBotLocales",
          "lex:ListBotVersions",
          "lex:ListBots",
          "lex:ListIntents",
          "lex:ListSlotTypes",
          "lex:ListSlots",
          "lex:ListTagsForResource",
          "lex:TagResource",
          "lex:UntagResource",
          "lex:UpdateBot",
          "lex:UpdateBotAlias",
          "lex:UpdateBotLocale",
          "lex:UpdateExport",
          "lex:UpdateIntent",
          "lex:UpdateResourcePolicy",
          "lex:UpdateSlot",
          "lex:UpdateSlotType",
        ],
        resources: [
          `arn:aws:lex:${props.env!.region}:${props.env!.account}:*`
        ]
      }));

      handlerRole.addToPolicy(new PolicyStatement({
        actions: [
          "iam:PassRole"
        ],
        resources: [`arn:aws:iam::${props.env!.account}:role/*`]
      }));

      new cdk.CfnOutput(this, 'LexV2Role', {
        value: handlerRole.roleArn,
        exportName: props.v2.roleOutput || "LexV2Role"
      });


      if (props.v2.bot) {
        new CustomResourceBaseStack(this, props.v2.bot.stackName || 'v2LexBotCustomResourcesStack', props.env!, {
          exportName: props.v2.bot.exportName || "v2LexBotProviderServiceToken",
          handler: {
            folder: props.v2.bot.folder || `${__dirname}/../../v2/handlers/lex-bot`,
            handlerName: props.v2.bot.handlerName || "handler",
            entry: "index.js",
            timeout: props.v2.bot.timeout || 120,
            environment: props.v2.bot.environment || handlerEnvConfig,
            runtime: props.v2.bot.runtime || Runtime.NODEJS_14_X
          },
          role: handlerRole
        });
      }

      if (props.v2.intent) {
        new CustomResourceBaseStack(this, props.v2.intent.stackName || 'v2LexIntentCustomResourcesStack', props.env!, {
          exportName: props.v2.intent.exportName || "v2LexIntentProviderServiceToken",
          handler: {
            folder: props.v2.intent.folder || `${__dirname}/../../v2/handlers/lex-intent`,
            handlerName: props.v2.intent.handlerName || "handler",
            entry: "index.js",
            timeout: props.v2.intent.timeout || 120,
            environment: props.v2.intent.environment || handlerEnvConfig,
            runtime: props.v2.intent.runtime || Runtime.NODEJS_14_X
          },
          role: handlerRole
        });
      }

      if (props.v2.botLocale) {
        new CustomResourceBaseStack(this, props.v2.botLocale.stackName || 'v2LexBotLocaleCustomResourcesStack', props.env!, {
          exportName: props.v2.botLocale.exportName || "v2LexBotLocaleProviderServiceToken",
          handler: {
            folder: props.v2.botLocale.folder || `${__dirname}/../../v2/handlers/lex-bot-locale`,
            handlerName: props.v2.botLocale.handlerName || "handler",
            entry: "index.js",
            timeout: props.v2.botLocale.timeout || 120,
            environment: props.v2.botLocale.environment || handlerEnvConfig,
            runtime: props.v2.botLocale.runtime || Runtime.NODEJS_14_X
          },
          role: handlerRole
        });
      }

      if (props.v2.botVersion) {
        new CustomResourceBaseStack(this, props.v2.botVersion.stackName || 'v2LexBotVersionCustomResourcesStack', props.env!, {
          exportName: props.v2.botVersion.exportName || "v2LexBotVersionProviderServiceToken",
          handler: {
            folder: props.v2.botVersion.folder || `${__dirname}/../../v2/handlers/lex-bot-version`,
            handlerName: props.v2.botVersion.handlerName || "handler",
            entry: "index.js",
            timeout: props.v2.botVersion.timeout || 120,
            environment: props.v2.botVersion.environment || handlerEnvConfig,
            runtime: props.v2.botVersion.runtime || Runtime.NODEJS_14_X
          },
          role: handlerRole
        });
      }

      if (props.v2.slotType) {
        new CustomResourceBaseStack(this, props.v2.slotType.stackName || 'v2LexSlotTypeCustomResourcesStack', props.env!, {
          exportName: props.v2.slotType.exportName || "v2LexSlotTypeProviderServiceToken",
          handler: {
            folder: props.v2.slotType.folder || `${__dirname}/../../v2/handlers/lex-slot-type`,
            handlerName: props.v2.slotType.handlerName || "handler",
            entry: "index.js",
            timeout: props.v2.slotType.timeout || 120,
            environment: props.v2.slotType.environment || handlerEnvConfig,
            runtime: props.v2.slotType.runtime || Runtime.NODEJS_14_X
          },
          role: handlerRole
        });
      }

      if (props.v2.slot) {
        new CustomResourceBaseStack(this, props.v2.slot.stackName || 'v2LexSlotCustomResourcesStack', props.env!, {
          exportName: props.v2.slot.exportName || "v2LexSlotProviderServiceToken",
          handler: {
            folder: props.v2.slot.folder || `${__dirname}/../../v2/handlers/lex-slot`,
            handlerName: props.v2.slot.handlerName || "handler",
            entry: "index.js",
            timeout: props.v2.slot.timeout || 120,
            environment: props.v2.slot.environment || handlerEnvConfig,
            runtime: props.v2.slot.runtime || Runtime.NODEJS_14_X
          },
          role: handlerRole
        });
      }

      if (props.v2.botAlias) {
        new CustomResourceBaseStack(this, props.v2.botAlias.stackName || 'v2LexBotAliasCustomResourcesStack', props.env!, {
          exportName: props.v2.botAlias.exportName || "v2LexBotAliasProviderServiceToken",
          handler: {
            folder: props.v2.botAlias.folder || `${__dirname}/../../v2/handlers/lex-bot-alias`,
            handlerName: props.v2.botAlias.handlerName || "handler",
            entry: "index.js",
            timeout: props.v2.botAlias.timeout || 120,
            environment: props.v2.botAlias.environment || handlerEnvConfig,
            runtime: props.v2.botAlias.runtime || Runtime.NODEJS_14_X
          },
          role: handlerRole
        });
      }

      if (props.v2.intentPriority) {
        new CustomResourceBaseStack(this, props.v2.intentPriority.stackName || 'v2LexIntentPriorityCustomResourcesStack', props.env!, {
          exportName: props.v2.intentPriority.exportName || "v2LexBotIntentPriorityProviderServiceToken",
          handler: {
            folder: props.v2.intentPriority.folder || `${__dirname}/../../v2/handlers/lex-intent-priority`,
            handlerName: props.v2.intentPriority.handlerName || "handler",
            entry: "index.js",
            timeout: props.v2.intentPriority.timeout || 120,
            environment: props.v2.intentPriority.environment || handlerEnvConfig,
            runtime: props.v2.intentPriority.runtime || Runtime.NODEJS_14_X
          },
          role: handlerRole
        });
      }
    }
  }
}
