import * as cdk from '@aws-cdk/core';
import { CustomResourceBaseStack } from './custom-resource-base-stack';


export class CustomResourcesStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, env: cdk.Environment) {
        super(scope, id);

        const handlerEnvConfig = {
            RETRIES: "40",
            WAIT_TIME: "2000"
        }

        const _botResource = new CustomResourceBaseStack(this, 'LexBotCustomResourcesStack', env,
            {
                exportName: "lexBotProviderServiceToken",
                handler: {
                    folder: "lex-bot",
                    handlerName: "index.handler",
                    timeout: 120,
                    environment: handlerEnvConfig
                },
                role: {
                    parentResource: "lex",
                    childResource: "bot",
                    actions: ["lex:PutBot", "lex:DeleteBot", "lex:GetBot"]
                }
            });
        const _intentResource = new CustomResourceBaseStack(this, 'LexIntentCustomResourcesStack', env,
            {
                exportName: "lexIntentProviderServiceToken",
                handler: {
                    folder: "lex-intent",
                    handlerName: "index.handler",
                    timeout: 120,
                    environment: handlerEnvConfig
                },
                role: {
                    parentResource: "lex",
                    childResource: "intent",
                    actions: ["lex:PutIntent", "lex:DeleteIntent", "lex:GetIntent"]
                }
            });
        const _slotTypeResource = new CustomResourceBaseStack(this, 'LexSlotTypeCustomResourcesStack', env,
            {
                exportName: "lexSlotTypeProviderServiceToken",
                handler: {
                    folder: "lex-slot-type",
                    handlerName: "index.handler",
                    timeout: 120,
                    environment: handlerEnvConfig
                },
                role: {
                    parentResource: "lex",
                    childResource: "slottype",
                    actions: ["lex:GetSlotType", "lex:PutSlotType", "lex:DeleteSlotType"]
                }
            });
    }
}
