import {
  LexBotAttributes,
  LexBot,
  LexSlotType,
  MessageContentType,
  LexIntentAttributes,
  SlotConstraint,
  LexIntent,
} from '../index';
import * as cdk from '@aws-cdk/core';

const sampleStack = new cdk.Stack();

test('Test Bot Attributes', () => {

  let testSlotType = new LexSlotType(sampleStack, 'TestSlotType', 'testServiceToken', {
    description: "Test slot type",
    enumerationValues: [
      {
        value: "YES",
        synonyms: [
          "yup",
          "yep"
        ]
      }
    ]
  });

  let intentAttrs: LexIntentAttributes = {
    slots: [
      {
        name: 'TestSlot',
        slotConstraint: SlotConstraint.REQUIRED,
        slotType: testSlotType.slotTypeName(),
        slotTypeVersion: "$LATEST",
        valueElicitationPrompt: {
          messages: [
            {
              contentType: MessageContentType.PLAIN_TEXT,
              content: 'Please enter the test slot value!',
            },
          ],
        },
      },
    ],
  };

  let testIntent = new LexIntent(sampleStack, 'Test_Intent', 'testServiceToken', intentAttrs);

  let attrs: LexBotAttributes = {
    name: 'Test_Bot',
    intents: [testIntent.toCDK()],
    clarificationPrompt: {
      messages: [
        {
          content: 'This is a sample clarification prompt text!',
          contentType: MessageContentType.PLAIN_TEXT,
        },
      ],
    },
    abortStatement: {
      messages: [
        {
          content: 'This is a sample abort text!',
          contentType: MessageContentType.PLAIN_TEXT,
        },
      ],
    },
    idleSessionTTLInSeconds: 30,
    childDirected: false,
    locale: 'en-US',
  };

  let bot = new LexBot(sampleStack, 'Test_Bot', 'testServiceToken', attrs);

  expect(testSlotType.slotTypeName()).toBe("TestSlotType");
  expect(testIntent.props.name).toBe('Test_Intent');
  expect(attrs.name).toBe('Test_Bot');
  expect(bot.validName()).toBe(true);
  expect(bot.props.name).toBe('Test_Bot');
});
