import * as cdk from '@aws-cdk/core';
import { CustomResourceBaseStack } from './custom-resource-base-stack';
import { Role, ServicePrincipal, PolicyStatement, ManagedPolicy } from '@aws-cdk/aws-iam';
import { BotType } from './custom-resource-data-types';
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
  v1?: {
    bot?: CustomResourceBaseStackProps,
    intent?: CustomResourceBaseStackProps,
    slotType?: CustomResourceBaseStackProps
  },
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

    if (props.v1?.bot) {
      const _botResource = new CustomResourceBaseStack(this, props.v1.bot.stackName || 'LexBotCustomResourcesStack', props.env!, {
        exportName: props.v1.bot.exportName || "lexBotProviderServiceToken",
        handler: {
          folder: props.v1.bot.folder || "./lib/handlers/lex-bot",
          handlerName: props.v1.bot.handlerName || "index.handler",
          timeout: props.v1.bot.timeout || 120,
          environment: props.v1.bot.environment || handlerEnvConfig,
          runtime: props.v1.bot.runtime || Runtime.NODEJS_14_X
        },
        role: {
          parentResource: props.v1.bot.role?.parentResource || "lex",
          childResource: props.v1.bot.role?.childResource || "bot",
          actions: props.v1.bot.role?.actions || ["lex:PutBot", "lex:DeleteBot", "lex:GetBot"]
        }
      });
    }

    if (props.v1?.intent) {
      const _intentResource = new CustomResourceBaseStack(this, props.v1.intent.stackName || 'LexIntentCustomResourcesStack', props.env!, {
        exportName: props.v1.intent.exportName || "lexIntentProviderServiceToken",
        handler: {
          folder: props.v1.intent.folder || "./lib/handlers/lex-intent",
          handlerName: props.v1.intent.handlerName || "index.handler",
          timeout: props.v1.intent.timeout || 120,
          environment: props.v1.intent.environment || handlerEnvConfig,
          runtime: props.v1.intent.runtime || Runtime.NODEJS_14_X
        },
        role: {
          parentResource: props.v1.intent.role?.parentResource || "lex",
          childResource: props.v1.intent.role?.childResource || "intent",
          actions: props.v1.intent.role?.actions || ["lex:PutIntent", "lex:DeleteIntent", "lex:GetIntent"]
        }
      })
    }

    if (props.v1?.slotType) {
      const _slotTypeResource = new CustomResourceBaseStack(this, props.v1.slotType.stackName || 'LexSlotTypeCustomResourcesStack', props.env!, {
        exportName: props.v1.slotType.exportName || "lexSlotTypeProviderServiceToken",
        handler: {
          folder: props.v1.slotType.folder || "./lib/handlers/lex-slot-type",
          handlerName: props.v1.slotType.handlerName || "index.handler",
          timeout: props.v1.slotType.timeout || 120,
          environment: props.v1.slotType.environment || handlerEnvConfig,
          runtime: props.v1.slotType.runtime || Runtime.NODEJS_14_X
        },
        role: {
          parentResource: props.v1.slotType.role?.parentResource || "lex",
          childResource: props.v1.slotType.role?.childResource || "slottype",
          actions: props.v1.slotType.role?.actions || ["lex:GetSlotType", "lex:PutSlotType", "lex:DeleteSlotType"]
        }
      })
    }


    if (props.v2) {
      //V2 Role here
      const handlerRole = new Role(this, `v2LexCustomLambdaRole`, {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com').grantPrincipal
      });

      handlerRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));
      handlerRole.addToPolicy(new PolicyStatement({
        actions: [
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

      const _lexV2RoleOutput = new cdk.CfnOutput(this, 'LexV2Role', {
        value: handlerRole.roleArn,
        exportName: props.v2.roleOutput || "LexV2Role"
      });


      if (props.v2.bot) {
        const _v2BotResource = new CustomResourceBaseStack(this, props.v2.bot.stackName || 'v2LexBotCustomResourcesStack', props.env!, {
          exportName: props.v2.bot.exportName || "v2LexBotProviderServiceToken",
          handler: {
            folder: props.v2.bot.folder || "./lib/handlers/v2/lex-bot",
            handlerName: props.v2.bot.handlerName || "index.handler",
            timeout: props.v2.bot.timeout || 120,
            environment: props.v2.bot.environment || handlerEnvConfig,
            runtime: props.v2.bot.runtime || Runtime.NODEJS_14_X
          },
          role: {
            customRole: handlerRole
          },
          type: BotType.V2
        });
      }

      if (props.v2.intent) {
        const _v2IntentResource = new CustomResourceBaseStack(this, props.v2.intent.stackName || 'v2LexIntentCustomResourcesStack', props.env!, {
          exportName: props.v2.intent.exportName || "v2LexIntentProviderServiceToken",
          handler: {
            folder: props.v2.intent.folder || "./lib/handlers/v2/lex-intent",
            handlerName: props.v2.intent.handlerName || "index.handler",
            timeout: props.v2.intent.timeout || 120,
            environment: props.v2.intent.environment || handlerEnvConfig,
            runtime: props.v2.intent.runtime || Runtime.NODEJS_14_X
          },
          role: {
            customRole: handlerRole
          },
          type: BotType.V2
        });
      }

      if (props.v2.botLocale) {
        const _v2BotLocaleResource = new CustomResourceBaseStack(this, props.v2.botLocale.stackName || 'v2LexBotLocaleCustomResourcesStack', props.env!, {
          exportName: props.v2.botLocale.exportName || "v2LexBotLocaleProviderServiceToken",
          handler: {
            folder: props.v2.botLocale.folder || "./lib/handlers/v2/lex-bot-locale",
            handlerName: props.v2.botLocale.handlerName || "index.handler",
            timeout: props.v2.botLocale.timeout || 120,
            environment: props.v2.botLocale.environment || handlerEnvConfig,
            runtime: props.v2.botLocale.runtime || Runtime.NODEJS_14_X
          },
          role: {
            customRole: handlerRole
          },
          type: BotType.V2
        });
      }

      if (props.v2.botVersion) {
        const _v2BotVersionResource = new CustomResourceBaseStack(this, props.v2.botVersion.stackName || 'v2LexBotVersionCustomResourcesStack', props.env!, {
          exportName: props.v2.botVersion.exportName || "v2LexBotVersionProviderServiceToken",
          handler: {
            folder: props.v2.botVersion.folder || "./lib/handlers/v2/lex-bot-version",
            handlerName: props.v2.botVersion.handlerName || "index.handler",
            timeout: props.v2.botVersion.timeout || 120,
            environment: props.v2.botVersion.environment || handlerEnvConfig,
            runtime: props.v2.botVersion.runtime || Runtime.NODEJS_14_X
          },
          role: {
            customRole: handlerRole
          },
          type: BotType.V2
        });
      }

      if (props.v2.slotType) {
        const _v2SlotTypeResource = new CustomResourceBaseStack(this, props.v2.slotType.stackName || 'v2LexSlotTypeCustomResourcesStack', props.env!, {
          exportName: props.v2.slotType.exportName || "v2LexSlotTypeProviderServiceToken",
          handler: {
            folder: props.v2.slotType.folder || "./lib/handlers/v2/lex-slot-type",
            handlerName: props.v2.slotType.handlerName || "index.handler",
            timeout: props.v2.slotType.timeout || 120,
            environment: props.v2.slotType.environment || handlerEnvConfig,
            runtime: props.v2.slotType.runtime || Runtime.NODEJS_14_X
          },
          role: {
            customRole: handlerRole
          },
          type: BotType.V2
        });
      }

      if (props.v2.slot) {
        const _v2SlotResource = new CustomResourceBaseStack(this, props.v2.slot.stackName || 'v2LexSlotCustomResourcesStack', props.env!, {
          exportName: props.v2.slot.exportName || "v2LexSlotProviderServiceToken",
          handler: {
            folder: props.v2.slot.folder || "./lib/handlers/v2/lex-slot",
            handlerName: props.v2.slot.handlerName || "index.handler",
            timeout: props.v2.slot.timeout || 120,
            environment: props.v2.slot.environment || handlerEnvConfig,
            runtime: props.v2.slot.runtime || Runtime.NODEJS_14_X
          },
          role: {
            customRole: handlerRole
          },
          type: BotType.V2
        });
      }

      if (props.v2.botAlias) {
        const _v2SBotAliasResource = new CustomResourceBaseStack(this, props.v2.botAlias.stackName || 'v2LexBotAliasCustomResourcesStack', props.env!, {
          exportName: props.v2.botAlias.exportName || "v2LexBotAliasProviderServiceToken",
          handler: {
            folder: props.v2.botAlias.folder || "./lib/handlers/v2/lex-bot-alias",
            handlerName: props.v2.botAlias.handlerName || "index.handler",
            timeout: props.v2.botAlias.timeout || 120,
            environment: props.v2.botAlias.environment || handlerEnvConfig,
            runtime: props.v2.botAlias.runtime || Runtime.NODEJS_14_X
          },
          role: {
            customRole: handlerRole
          },
          type: BotType.V2
        });
      }

      if (props.v2.intentPriority) {
        const _v2SBotIntentPriorityResource = new CustomResourceBaseStack(this, props.v2.intentPriority.stackName || 'v2LexIntentPriorityCustomResourcesStack', props.env!, {
          exportName: props.v2.intentPriority.exportName || "v2LexBotIntentPriorityProviderServiceToken",
          handler: {
            folder: props.v2.intentPriority.folder || "./lib/handlers/v2/lex-intent-priority",
            handlerName: props.v2.intentPriority.handlerName || "index.handler",
            timeout: props.v2.intentPriority.timeout || 120,
            environment: props.v2.intentPriority.environment || handlerEnvConfig,
            runtime: props.v2.intentPriority.runtime || Runtime.NODEJS_14_X
          },
          role: {
            customRole: handlerRole
          },
          type: BotType.V2
        });
      }
    }
  }
}
