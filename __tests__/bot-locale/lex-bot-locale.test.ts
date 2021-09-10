import * as cdk from '@aws-cdk/core';

import LexBotLocale from '../../src/bot-locale/lex-bot-locale';

describe('Lex v2 Bot Locale class', () => {
  describe('Create a new instance of the bot-locale class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexBotLocale;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexBotLocale(sampleStack, 'SampleBotLocale', 'sampleServiceToken', {
        botId: 'SampleBotID',
        localeId: 'en-US',
        botVersion: 'DRAFT',
        nluIntentConfidenceThreshold: 0.5,
      });
    });

    it('Creates a new instance of the bot-locale v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Gets the cfn resource properly', () => {
      expect(instance.getResource() instanceof cdk.CustomResource).toBe(true);
    });
  });
});
