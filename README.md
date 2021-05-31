# awlexs

## AWS Lex Custom CDK

### What is it?
This is a library meant to make using AWS CDK alongside with AWS Lex alot easier. As of right now CDK does not support AWS Lex resources therefore this was made to do so using CDK Custom resources.

The resources created use lambda functions which make the AWS SDK calls to create the bots, intents and slot-types required for your Lex application. Included in this library are the custom resources (lambda functions) and custom classes that use said resources.


### How do I use it?
You'll need to have AWS CDK installed and a valid AWS login configured on your machine. The lambda handlers that come with this library are not required and you can choose to use your own handlers as long as they work as outlined in the documentation for custom resources in AWS CDK (https://docs.aws.amazon.com/cdk/api/latest/docs/custom-resources-readme.html). The steps are generally as follows:

1. Deploy the CustomResourcesStack as its own stack in your AWS account (this will create a stack of lambda functions and iam roles specific to the account which you deploy it in.)
2. Create your own CDK stack and use the LexBot, LexIntent and LexSlotType CDK constructs as you wish.
3. Deploy using `cdk deploy --profile <profile>`

*Note: it's usually smart to structure your Lex CDK stack as a collection of nested stacks (bots, intents, slottypes) and then provide structured dependson calls to ensure order of deployment/teardown*

### Example CDK Stack

```ts
import * as cdk from '@aws-cdk/core';

//each of these is a nested stack where we are using our custom resources
import { BotStack } from './nested/bot-stack';
import { IntentsStack } from './nested/intents-stack';
import { SlotTypeStack } from './nested/slot-type-stack';

export class BaseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    try {

      // the servicetokens are the export names we give to our lambda functions declared in the CustomResourceStack deployed before this. Can also be another custom lambda you declare yourself if you wish

      const slotTypeStack = new SlotTypeStack(this, `${id}-SlotTypeStack`, {
        lexSlotTypeServiceToken: "lexSlotTypeProviderServiceToken"
      });

      const intentStack = new IntentsStack(this, `${id}-IntentStack`, {
        lexIntentServiceToken: "lexIntentProviderServiceToken",
      });

      const botStack = new BotStack(this, `${id}-BotStack`, {
          lexBotServiceToken: 'lexBotProviderServiceToken',
      });

      // Add dependencies here to ensure order
      botStack.addDependency(intentStack);
      botStack.addDependency(slotTypeStack);
      intentStack.addDependency(lambdaStack);
      intentStack.addDependency(slotTypeStack);
    } catch (err) {
      console.error(err);
    }
  }
}

```

Now here is an example of one of the nested stacks (they are all pretty similar so will only show one for brevity)

```ts
import * as cdk from '@aws-cdk/core';
import { LexSlotType, ValueSelectionStrategy } from 'awlexs';

interface LexStackProps {
  lexSlotTypeServiceToken: string
}

export class SlotTypeStack extends cdk.NestedStack {
  props: LexStackProps

  constructor(scope: cdk.Construct, id: string, props: LexStackProps) {
    super(scope, id);
    this.props = props;

    const yesNo = new LexSlotType(this, 'YesNoSlotType', props.lexSlotTypeServiceToken, {
      valueSelectionStrategy: ValueSelectionStrategy.TOP_RESOLUTION,
      enumerationValues: [
        {
          value: "YES",
          synonyms: [
            "Yep",
            "Yes",
            "I Would",
            "I Think So",
            "Indeed",
            "Alright",
            "Yes Please",
            "Yes Thanks",
            "Yes Thank You",
            "Yeah",
            "Yah",
            "Yup",
            "Affirmative",
            "Please",
            "Okie Dokie",
            "Right",
            "Absolutely",
            "Surely",
            "Sure",
            "Sure Thing",
            "Certainly",
            "Very Well",
            "Of Course",
            "Okay",
            "OK",
            "Always",
            "Uh Huh",
            "You Got It",
            "You've Got It",
            "Definitely",
            "Correct"
          ]
        },
        {
          value: "NO",
          synonyms: [
            "Absolutely Not",
            "No",
            "Nope",
            "Nah",
            "No Way",
            "Never",
            "I Don't",
            "I Don't Think So",
            "I Do Not",
            "No Thank You",
            "No Thanks",
            "Negative",
            "Nay",
            "I Wouldn't",
            "I Would Not",
            "Of Course Not",
            "Not Really",
            "Hardly",
            "Not For Me",
            "I'll Pass",
            "Pass",
            "Not Today",
            "Not Interested",
            "I'm Not Interested",
            "I Don't Want It",
            "I Don't Want To",
            "I Would Rather Not",
            "I'd Rather Not",
            "Thanks But No Thanks",
            "Not Correct"
          ]
        }
      ]
    });
  }
}

```

## Library Guide

### Classes

---
### `CustomResourcesStack`
<br/>*extends cdk.Stack*

<br/>**Methods**:
- `constructor`
    <br/>params: `scope: cdk.Construct, id: string, env: cdk.Environment`

<br/>**Properties**: None


#### **Description:**
Creates 3 lambda handler functions and 3 provider functions to Lex bots, intents and slot types and exports the providers ARNs to cloudformation with the following export names:
- lexBotProviderServiceToken
- lexIntentProviderServiceToken
- lexSlotTypeProviderServiceToken

---
### `LexBot`
<br/>*extends cdk.Construct*

<br/>**Methods**:
- `constructor`
    <br/>params: `scope: cdk.Stack, id: string, serviceToken: string, props: LexBotAttributes`

- `validName`
    <br/>params: None
    <br/>returns: boolean
    <br/>description: Uses a regular expression to check for valid bot name

<br/>**Properties**:
- `scope`
    <br/>type: cdk.Stack
    <br/>description: the scope for this construct to be created in
- `id`
    <br/>type: string
    <br/>description: id for this construct
- `props`
    <br/>type: LexBotAttributes
    <br/>description: Properties required for creating a lex bot

#### **Description:**
Custom class for creating Lex bots with provided props and service token.

---
### `LexIntent`
<br/>*extends cdk.Construct*

<br/>**Methods**:
- `constructor`
    <br/>params: `scope: cdk.Stack, id: string, serviceToken: string, props: LexIntentAttributes`

- `toCDK`
    <br/>params: `version?: string`
    <br/>returns: LexIntentCDK
    <br/>description: Creates a nice format for AWS CDK to read when including in custom bot resource.

<br/>**Properties**:
- `scope`
    <br/>type: cdk.Stack
    <br/>description: the scope for this construct to be created in
- `id`
    <br/>type: string
    <br/>description: id for this construct
- `props`
    <br/>type: LexIntentAttributes
    <br/>description: Properties required for creating a lex intent

#### **Description:**
Custom class for creating Lex intents with provided props and service token.

---
### `LexSlotType`
<br/>*extends cdk.Construct*

<br/>**Methods**:
- `constructor`
    <br/>params: `scope: cdk.Stack, id: string, serviceToken: string, props: LexSlotTypeAttributes`

- `slotTypeName`
    <br/>params: None
    <br/>returns: string
    <br/>description: returns the name of the slottype

<br/>**Properties**:
- `scope`
    <br/>type: cdk.Stack
    <br/>description: the scope for this construct to be created in
- `id`
    <br/>type: string
    <br/>description: id for this construct
- `props`
    <br/>type: LexSlotTypeAttributes
    <br/>description: Properties required for creating a lex slot type

#### **Description:**
Custom class for creating Lex slot types with provided props and service token.

---

For interfaces and enums please see `lex-data-types.ts` which contains definitions for all attributes/enums used by the above classes.
