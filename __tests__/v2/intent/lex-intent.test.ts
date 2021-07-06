import LexIntent from '../../../src/v2/intent/lex-intent';
import * as cdk from '@aws-cdk/core';

describe('Lex v2 Intent class', () => {
  describe('Create a new instance of the intent class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexIntent;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexIntent(sampleStack, 'SampleIntent', 'sampleServiceToken', {
        botId: "sampleBotID",
        intentName: "SampleIntent",
        localeId: 'en-US'
      });
    });

    it('Creates a new instance of the intent v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Gets the correct name', () => {
      expect(instance.getName()).toBe("SampleIntent");
    });

    it('Gets the cfn resource properly', () => {
      expect(instance.getResource() instanceof cdk.CustomResource).toBe(true);
    });
  });
});
