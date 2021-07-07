import * as cdk from '@aws-cdk/core';

import LexBotVersion from '../../../src/v2/bot-version/lex-bot-version';

describe('Lex v2 Bot Version class', () => {
  describe('Create a new instance of the bot-version class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexBotVersion;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexBotVersion(sampleStack, 'SampleBotVersion', 'sampleServiceToken', {
        botId: 'SampleBotID',
        botVersionLocaleSpecification: {
          'en-US': {
            sourceBotVersion: 'DRAFT',
          },
        },
      });
    });

    it('Creates a new instance of the bot-version v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Gets the cfn resource properly', () => {
      expect(instance.getResource() instanceof cdk.CustomResource).toBe(true);
    });
  });
});
