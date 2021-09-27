# AWS CDK - Lex V2

This package contains an [AWS CDK](https://aws.amazon.com/cdk/) wrapper to create, update and provision Lex V2 bots.

## Features

* Deploy Lex V2 bots easily and reliably between environments!
* Define your Lex bots using best practices and Infrastructure as Code!
* Automatically build/release Lex bot versions and aliases!

## Installation

Using yarn:

```bash
$ yarn add @amaabca/aws-lex-custom-resources
```

Using npm:

```bash
$ npm install @amaabca/aws-lex-custom-resources
```

## Usage

This example is extracted from the AWS [OrderFlowersBot](https://github.com/aws-samples/aws-lex-v2-cfn-cr/blob/01395acd4901850433d1e95f437ab7ec5bbd5f52/examples/order-flowers/template.yaml) sample.

```ts
import {
  Construct,
  Stack,
} from '@aws-cdk/core';
import {
  LexCustomResource,
  LexBotDefinition,
} from '@amaabca/aws-lex-custom-resources';

export default class MyCdkStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Setup our custom resource from the AWS Serverless Application Repo.
    // Application link: https://serverlessrepo.aws.amazon.com/applications/us-east-1/777566285978/lex-v2-cfn-cr
    const provider = new LexCustomResource(
      this,
      'LexV2CfnCustomResource',
      {
        semanticVersion: '0.3.0',
        logLevel: 'INFO',
      }
    );

    // The LexBotDefinition class is our main entry point to Lex bot creation.
    // Once we're happy with our bot definition, call `botDefinition.build()` to
    // generate the resource.
    const botDefinition = new LexBotDefinition(
      this,
      'OrderFlowersBot',
      provider.serviceToken(),
      {
        botName: 'OrderFlowersBot',
        dataPrivacy: {
          childDirected: false,
        },
        description: 'Bot to order flowers on the behalf of a user',
        idleSessionTTLInSeconds: 300,
        roleArn: provider.serviceLinkedRoleArn(),
      }
    );

    // Add a language for our bot to which we can add intents/slots and slot types.
    const locale = botDefinition.addLocale({
      localeId: 'en_US',
      nluIntentConfidenceThreshold: 0.40,
      voiceSettings: {
        voiceId: 'Ivy',
      },
    });

    locale.addSlotType({
      slotTypeName: 'FlowerTypes',
      description: 'Types of flowers to pick up',
      valueSelectionSetting: {
        resolutionStrategy: 'OriginalValue'
      },
      slotTypeValues: [
        { sampleValue: { value: 'lillies' } },
        { sampleValue: { value: 'roses' } },
        { sampleValue: { value: 'tulips' } },
      ],
    });

    const orderFlowers = locale.addIntent({
      intentName: 'OrderFlowers',
      description: 'Intent to order a bouquet of flowers for pick up',
      sampleUtterances: [
        { utterance: 'I would like to pick up flowers' },
        { utterance: 'I would like to order some flower' },
      ],
      intentConfirmationSetting: {
        promptSpecification: {
          messageGroups: [
            {
              message: {
                plainTextMessage: {
                  value: 'Okay, your {FlowerType} will be ready for pickup by {PickupTime} on {PickupDate}. Does this sound okay?',
                },
              },
            },
          ],
          maxRetries: 2,
        },
        declinationResponse: {
          messageGroups: [
            {
              message: {
                plainTextMessage: {
                  value: 'Okay, I will not place your order.'
                },
              },
            },
          ],
        },
      },
    });

    orderFlowers.addSlot({
      slotName: 'FlowerType',
      slotTypeName: 'FlowerTypes',
      description: 'The type of flowers to pick up',
      valueElicitationSetting: {
        slotConstraint: 'Required',
        promptSpecification: {
          messageGroups: [
            {
              message: {
                plainTextMessage: {
                  value: 'What type of flowers would you like to order?',
                },
              },
            },
          ],
          maxRetries: 2,
        },
      },
    });

    orderFlowers.addSlot({
      slotName: 'PickupDate',
      slotTypeName: 'AMAZON.Date',
      description: 'The date to pick up the flowers',
      valueElicitationSetting: {
        slotConstraint: 'Required',
        promptSpecification: {
          messageGroups: [
            {
              message: {
                plainTextMessage: {
                  value: 'What day do you want the {FlowerType} to be picked up?',
                },
              },
            },
          ],
          maxRetries: 2,
        },
      },
    });

    orderFlowers.addSlot({
      slotName: 'PickupTime',
      slotTypeName: 'AMAZON.Time',
      description: 'The time to pick up the flowers',
      valueElicitationSetting: {
        slotConstraint: 'Required',
        promptSpecification: {
          messageGroups: [
            {
              message: {
                plainTextMessage: {
                  value: 'At what time do you want the {FlowerType} to be picked up?',
                },
              },
            },
          ],
          maxRetries: 2,
        },
      },
    });

    // create/update the bot resource
    const bot = botDefinition.build();

    // create a version that automatically is built when the bot changes
    const version = bot.automaticVersion();

    // create an alias and assign it to the latest bot version
    bot.addAlias({
      botAliasName: 'live',
      botVersion: version.botVersion(),
      botAliasLocaleSettings: {
        en_US: {
          enabled: true
        },
      },
    });
  }
}
```

## License

[MIT](LICENSE)
