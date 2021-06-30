# awlexs

## AWS Lex Custom CDK

### What is it?
This is a library meant to make using AWS CDK alongside with AWS Lex alot easier. As of right now CDK does not support AWS Lex resources therefore this was made to do so using CDK Custom resources.

The resources created use lambda functions which make the AWS SDK calls to create the bots, intents and slot-types required for your Lex application. Included in this library are the custom resources (lambda functions) and custom classes that use said resources.


### How do I use it?
You'll need to have AWS CDK installed and a valid AWS login configured on your machine. The lambda handlers that come with this library are not required and you can choose to use your own handlers as long as they work as outlined in the documentation for custom resources in AWS CDK (https://docs.aws.amazon.com/cdk/api/latest/docs/custom-resources-readme.html). The steps are generally as follows:

1. Create a new CDK app using `cdk init app --language typescript`
2. Install this library `npm i @amaabca/aws-lex-custom-resources`
3. Deploy the CustomResourcesStack as its own stack in your new CDK app. Be sure to specify the AWS region and AWS account (this will create a stack of lambda functions and iam roles specific to the account which you deploy it in.) See `CustomResourcesStack` at the bottom of the readme under CDK resources.
4. In a new or existing CDK project, create your own CDK stack and use the V1 or V2 constructs as you wish. (Please make sure your new CDK project is using the same version of CDK as this library (1.107.0))
3. Deploy using `cdk deploy --profile <profile>`

# Library Guide

## Lex Version 1 (Deprecated)

## Classes

### `LexBot`
<br/>*extends cdk.Construct*

```ts
interface LexBotAttributes {
  serviceToken?: string,
  name?: string,
  enableModelImprovements?: boolean,
  intents: LexIntentCDK[],
  clarificationPrompt: LexPrompt,
  abortStatement: LexPrompt,
  idleSessionTTLInSeconds: number,
  voiceId?: LexVoice,
  childDirected: boolean,
  createVersion?: boolean,
  locale: string,
  detectSentiment?: boolean,
  nluIntentConfidenceThreshold?: number
}
```

<br/>**Methods**:

```ts
constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexBotAttributes);
validName(): boolean

```

#### **Description:**
Custom class for creating Lex bots with provided props and service token.

---
### `LexIntent`
<br/>*extends cdk.Construct*

```ts
interface LexIntentAttributes {
  name?: string,
  checksum?: string,
  conclusionStatement?: LexPrompt,
  confirmationPrompt?: LexPrompt,
  createVersion?: boolean,
  description?: string,
  dialogCodeHook?: DialogCodeHook,
  followUpPrompt?: {
    prompt: LexPrompt,
    rejectionStatement: LexPrompt
  },
  fulfillmentActivity?: FulfillmentActivity,
  inputContexts?: { name: string }[],
  kendraConfiguration?: KendraConfig,
  outputContexts?: { name: string, timeToLiveInSeconds: number, turnsToLive: number }[],
  parentIntentSignature?: string,
  rejectionStatement?: LexPrompt,
  sampleUtterances?: string[],
  slots: LexSlot[]
}

```

<br/>**Methods**:

```ts
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexIntentAttributes);
  toCDK(version?: string): LexIntentCDK;
```


#### **Description:**
Custom class for creating Lex intents with provided props and service token.

---
### `LexSlotType`
<br/>*extends cdk.Construct*

```ts
  interface LexSlotTypeAttributes {
    name?: string,
    description?: string,
    checksum?: string,
    createVersion?: boolean,
    enumerationValues: LexSlotTypeEnumerationValue[],
    parentSlotTypeSignature?: string,
    slotTypeConfigurations?: SlotTypeConfiguration[],
    valueSelectionStrategy?: ValueSelectionStrategy
  }
```

<br/>**Methods**:

```ts
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexSlotTypeAttributes);
  slotTypeName(): string;
```

#### **Description:**
Custom class for creating Lex slot types with provided props and service token.

---

For interfaces and enums please see `/v1/lex-data-types.ts` which contains definitions for all attributes/enums used by the above classes.

## Lex Version 2

---
### `LexBot`
<br/>*extends cdk.Construct*

```ts
  interface LexBotAttributes {
    botName?: string,
    botTags?: {
      [key: string]: string
    },
    dataPrivacy: {
      childDirected: boolean
    },
    description?: string,
    idleSessionTTLInSeconds: number,
    roleArn: string,
    testBotAliasTags?: {
      [key: string]: string
    }
  }
```

<br/>**Methods**:

```ts
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexBotAttributes);
  validName(): boolean;
  getName(): string;
  getResource(): cdk.CustomResource;
```

#### **Description:**
Custom class for creating v2 Lex bots with provided props and service token.

---

### `LexBotAlias`
<br/>*extends cdk.Construct*

```ts
  interface LexBotAliasAttributes {
    botId: string,
    botAliasName: string,
    botAliasLocaleSettings: { [key: string]: BotAliasLocaleSettings },
    botVersion?: string,
    conversationLogSettings?: ConversationLogSettings,
    description?: string,
    sentimentAnalysisSettings?: SentimentAnalysisSettings,
    tags?: { [key: string]: string }
  }
```

<br/>**Methods**:

```ts
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexBotAliasAttributes);
```

#### **Description:**
Custom class for creating v2 Lex bot aliases with provided props and service token.

---

### `LexBotLocale`
<br/>*extends cdk.Construct*

```ts
  interface LexBotLocaleAttributes {
    botId: string,
    botVersion: string,
    description?: string,
    localeId: string,
    nluIntentConfidenceThreshold: number,
    voiceSettings?: VoiceSettings
  }
```

<br/>**Methods**:

```ts
    constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexBotLocaleAttributes);
    getResource(): cdk.CustomResource;
```

#### **Description:**
Custom class for creating v2 Lex bot locales (languages) with provided props and service token.

---

### `LexBotVersion`
<br/>*extends cdk.Construct*

```ts
  interface LexBotVersionAttributes {
    botId: string,
    botVersionLocaleSpecification: { [key: string]: BotVersionLocaleDetails } | undefined,
    description?: string
  }
```

<br/>**Methods**:

```ts
    constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexBotVersionAttributes);
    getResource(): cdk.CustomResource;
```

#### **Description:**
Custom class for creating v2 Lex bot versions with provided props and service token.

---

### `LexIntent`
<br/>*extends cdk.Construct*

```ts
  interface LexIntentAttributes {
    botId: string,
    botVersion?: string,
    description?: string,
    dialogCodeHook?: DialogCodeHookSettings,
    fulfillmentCodeHook?: FulfillmentCodeHookSettings
    inputContexts?: InputContext[],
    intentClosingSetting?: IntentClosingSetting,
    intentConfirmationSetting?: IntentConfirmationSetting,
    intentName: string,
    kendraConfiguration?: KendraConfiguration,
    localeId: string,
    outputContexts?: OutputContext[],
    parentIntentSignature?: string,
    sampleUtterances?: SampleUtterance[]
  }
```

<br/>**Methods**:

```ts
    constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexIntentAttributes);
    getName(): string;
    getResource(): cdk.CustomResource;
```

#### **Description:**
Custom class for creating v2 Lex intents with provided props and service token.

---

### `LexIntentPriority`
<br/>*extends cdk.Construct*

```ts
  interface LexIntentPriorityAttributes {
    botId: string,
    botVersion?: string,
    intentId: string,
    intentName: string,
    localeId: string,
    slotPriorities: SlotPriority[]
  }
```

<br/>**Methods**:

```ts
    constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexIntentPriorityAttributes);
    getResource(): cdk.CustomResource;
```

#### **Description:**
Custom class for creating v2 Lex intent priorities (SDK call to update Intents with proper slot priorities as this cannot be done on intent creation) with provided props and service token.

---

### `LexSlot`
<br/>*extends cdk.Construct*

```ts
  interface LexSlotAttributes {
    botId: string,
    botVersion?: string,
    description?: string,
    localeId: string,
    intentId: string,
    obfuscationSetting?: ObfuscationSetting,
    slotName: string,
    slotTypeId: string,
    valueElicitationSetting: SlotValueElicitationSetting,
    priority: number
  }
```

<br/>**Methods**:

```ts
    constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexSlotAttributes);
    getResource(): cdk.CustomResource;
```

#### **Description:**
Custom class for creating v2 Lex slots with provided props and service token.

---

### `LexSlotType`
<br/>*extends cdk.Construct*

```ts
  interface LexSlotTypeAttributes {
    botId: string,
    botVersion?: string,
    description?: string,
    localeId: string,
    parentSlotTypeSignature?: string,
    slotTypeName: string,
    slotTypeValues?: SlotTypeValue[],
    valueSelectionSetting: SlotValueSelectionSetting
  }
```

<br/>**Methods**:

```ts
    constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexSlotAttributes);
    getResource(): cdk.CustomResource;
    getName(): string;
```

#### **Description:**
Custom class for creating v2 Lex slot types with provided props and service token.

---

For interfaces and enums please see `/v2/lex-data-types.ts` which contains definitions for all attributes/enums used by the above classes.



## CDK Resources
---
### `CustomResourcesStack`
<br/>*extends cdk.Stack*

<br/>**Methods**:
- `constructor`
    <br/>params: `scope: cdk.Construct, id: string, props: CustomResourcesStackProps`
    ```ts
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
        }
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
    ```

<br/>**Properties**: None


#### **Description:**
Creates custom resource lambda handler functions and provider functions for Lex V2 types and exports the providers ARNs to cloudformation with the following (default) export names:

#### V1

- lexBotProviderServiceToken
- lexIntentProviderServiceToken
- lexSlotTypeProviderServiceToken

#### V2

- v2LexBotProviderServiceToken
- v2LexIntentProviderServiceToken
- v2LexBotLocaleProviderServiceToken
- v2LexBotVersionProviderServiceToken
- v2LexSlotTypeProviderServiceToken
- v2LexSlotProviderServiceToken
- v2LexBotAliasProviderServiceToken
- v2LexBotIntentPriorityProviderServiceToken

The stack will use defaulted values for each resource if the CustomResourceBaseStackProps only has `enabled` set to `true`. These defaults change depending on the resource. By default the stack resources use handler code that is included in the library. The handlers for v1 rely on the AWS SDK and it is auto supplied by lambda, the v2 handlers run esbuild and bundle up the packages automatically. This can be customized as seen in the props above.


#### Example Usage:

- Use defaults and create all Lex Custom Resource handlers:

```ts
  const app = new cdk.App();

  new cdkResources.CustomResourcesStack(app, 'CustomResourceStackTest', {
    env: {
      region: 'us-east-1',
      account: '12345'
    },
    v1: {
      bot: {
        enabled: true
      },
      intent: {
        enabled: true
      },
      slotType: {
        enabled: true
      }
    },
    v2: {
      bot: {
        enabled: true
      },
      intent: {
        enabled: true
      },
      slot: {
        enabled: true
      },
      intentPriority: {
        enabled: true
      },
      botVersion: {
        enabled: true
      },
      botAlias: {
        enabled: true
      },
      botLocale: {
        enabled: true
      },
      slotType: {
        enabled: true
      }
    }
  });
```

- Create using defaults for V2 Bot Slot, and SlotType aswell as customized V2 Intent (Bot, Slot, SlotType and Intent will only be created):

```ts
new cdkResources.CustomResourcesStack(app, 'CustomResourceStackTest', {
  env: {
    region: 'us-east-1',
    account: '12345'
  },
  v2: {
    bot: {
      enabled: true
    },
    intent: {
      enabled: true,
      handlerName: 'main.customHandlerFunc', // Assumes we have a main.py file here
      folder: './lib/customHandlers/intent/',
      runtime: Runtime.PYTHON_3_8,
      timeout: 30
    },
    slot: {
      enabled: true
    },
    slotType: {
      enabled: true
    }
  }
});
```

---
