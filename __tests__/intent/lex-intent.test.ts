import * as cdk from '@aws-cdk/core';

import LexIntent from '../../src/intent/lex-intent';

describe('Lex v2 Intent class', () => {
  describe('Create a new instance of the intent class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexIntent;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexIntent(sampleStack, 'sampleServiceToken', {
        botId: 'sampleBotID',
        intentName: 'SampleIntent',
        localeId: 'en-US',
        slotServiceToken: 'SampleSlotServiceToken',
      });
    });

    it('Creates a new instance of the intent v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Gets the correct name', () => {
      expect(instance.Name).toBe('SampleIntent');
    });

    it('Gets the cfn resource properly', () => {
      expect(instance.Resource instanceof cdk.CustomResource).toBe(true);
    });
  });
});
