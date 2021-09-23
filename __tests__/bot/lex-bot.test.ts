import * as cdk from '@aws-cdk/core';
import { LexBot, LexBotDefinition, LexBotLocale } from '../../src';

describe('Lex Bot', () => {
  describe('Bot definition', () => {
    const sampleStack: cdk.Stack = new cdk.Stack();
    const instance: LexBotDefinition = new LexBotDefinition(
      sampleStack,
      'BotDefinition',
      'SAM-ServiceToken',
      {
        dataPrivacy: {
          childDirected: false,
        },
        idleSessionTTLInSeconds: 90,
        roleArn: 'TestARN',
      }
    );

    it('Creates a new definition', () => {
      expect(instance).not.toBe(null);
    });

    describe('Adding a new locale', () => {
      let english: LexBotLocale;

      beforeAll(() => {
        english = instance.addLocale({
          localeId: 'en_US',
          nluIntentConfidenceThreshold: 0.2,
        });
      });

      it('Creates an english locale', () => {
        expect(english.props.localeId).toBe('en_US');
      });

      describe('Definition', () => {
        it('Generates a json object for the bot', () => {
          const definition = instance.definition();
          expect(definition['CR.botLocales'].length).toBe(1);
        });
      });

      describe('Build', () => {
        it('Creates a Lex Bot construct', () => {
          const bot: LexBot = instance.build();
          expect(bot).toBeInstanceOf(LexBot);
        });
      });
    });
  });
});
