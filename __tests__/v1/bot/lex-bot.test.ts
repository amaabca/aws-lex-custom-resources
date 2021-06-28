import {
  v1
} from '../../../src/';
import * as cdk from '@aws-cdk/core';

const sampleStack = new cdk.Stack();

test('Test Bot Attributes', () => {
  const testSlotType = new v1.LexSlotType(sampleStack, 'TestSlotType', 'testServiceToken', {
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

  const intentAttrs: v1.LexIntentAttributes = {
    slots: [
      {
        name: 'TestSlot',
        slotConstraint: v1.SlotConstraint.REQUIRED,
        slotType: testSlotType.slotTypeName(),
        slotTypeVersion: "$LATEST",
        valueElicitationPrompt: {
          messages: [
            {
              contentType: v1.MessageContentType.PLAIN_TEXT,
              content: 'Please enter the test slot value!',
            },
          ],
        },
      },
    ],
  };

  const testIntent = new v1.LexIntent(sampleStack, 'Test_Intent', 'testServiceToken', intentAttrs);

  const attrs: v1.LexBotAttributes = {
    name: 'Test_Bot',
    intents: [testIntent.toCDK()],
    clarificationPrompt: {
      messages: [
        {
          content: 'This is a sample clarification prompt text!',
          contentType: v1.MessageContentType.PLAIN_TEXT,
        },
      ],
    },
    abortStatement: {
      messages: [
        {
          content: 'This is a sample abort text!',
          contentType: v1.MessageContentType.PLAIN_TEXT,
        },
      ],
    },
    idleSessionTTLInSeconds: 30,
    childDirected: false,
    locale: 'en-US',
  };

  const bot = new v1.LexBot(sampleStack, 'Test_Bot', 'testServiceToken', attrs);

  expect(testSlotType.slotTypeName()).toBe("TestSlotType");
  expect(testIntent.props.name).toBe('Test_Intent');
  expect(attrs.name).toBe('Test_Bot');
  expect(bot.validName()).toBe(true);
  expect(bot.props.name).toBe('Test_Bot');
});
