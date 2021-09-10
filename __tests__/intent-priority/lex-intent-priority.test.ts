import LexIntentPriority from '../../src/intent-priority/lex-intent-priority';
import * as cdk from '@aws-cdk/core';

describe('Lex v2 Intent Priority class', () => {
  describe('Create a new instance of the intent-priority class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexIntentPriority;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexIntentPriority(sampleStack, 'SampleIntentPriority', 'sampleServiceToken', {
        botId: 'SampleBotID',
        localeId: 'en-US',
        intentId: 'SampleIntentID',
        intentName: 'SampleIntentName',
        slotPriorities: [
          {
            priority: 1,
            slotId: 'FirstSlot',
          },
          {
            priority: 2,
            slotId: 'SecondSlot',
          },
        ],
      });
    });


    it('Creates a new instance of the intent-priority v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Gets the cfn resource properly', () => {
      expect(instance.getResource() instanceof cdk.CustomResource).toBe(true);
    });
  });
});
