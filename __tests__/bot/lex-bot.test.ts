import { Stack } from 'aws-cdk-lib';
import { LexBot, LexBotAlias, LexBotDefinition, LexBotLocale, LexBotVersion } from '../../src';

describe('Lex Bot', () => {
  describe('Bot definition', () => {
    const sampleStack: Stack = new Stack();
    const instance: LexBotDefinition = new LexBotDefinition(sampleStack, 'BotDefinition', 'SAM-ServiceToken', {
      dataPrivacy: {
        childDirected: false,
      },
      idleSessionTTLInSeconds: 90,
      roleArn: 'TestARN',
    });

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
        const bot: LexBot = instance.build();

        it('Creates a Lex Bot construct', () => {
          expect(bot).toBeInstanceOf(LexBot);
        });

        describe('automaticVersion', () => {
          it('Returns a lex bot version for the bot', () => {
            expect(bot.automaticVersion()).toBeInstanceOf(LexBotVersion);
          });
        });

        describe('addAlias', () => {
          it('Returns a lex bot alias for the bot', () => {
            expect(
              bot.addAlias({ botAliasName: 'test', botAliasLocaleSettings: { en_US: { enabled: true } } }),
            ).toBeInstanceOf(LexBotAlias);
          });
        });
      });
    });
  });
});
