import LexBotAlias from '../../../src/v2/bot-alias/lex-bot-alias';
import * as cdk from '@aws-cdk/core';

describe('Lex v2 Bot Alias class', () => {
  describe('Create a new instance of the bot-alias class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexBotAlias;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexBotAlias(sampleStack, 'SampleBotAlias', 'sampleServiceToken', {
        botId: "SampleBotID",
        botVersion: "DRAFT",
        botAliasName: "SampleBotAlias",
        botAliasLocaleSettings: {
          'en-US': {
            codeHookSpecification: {
              lambdaCodeHook: {
                lambdaARN: "SOMELAMBDAARN",
                codeHookInterfaceVersion: "$LATEST"
              }
            },
            enabled: true
          }
        }
      });
    });

    it('Creates a new instance of the bot-alias v2 class', () => {
      expect(instance).not.toBeNull();
    });
  });
});