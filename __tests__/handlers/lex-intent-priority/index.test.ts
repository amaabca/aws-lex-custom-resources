import nock from 'nock';

import fixtures from '../../../__fixtures__';
import { handler } from '../../../src/handlers/lex-intent-priority/index.js';

describe('v2-lex-bot-handler', () => {
  describe('with a create event', () => {
    let scope: nock.Scope;
    let getScope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      getScope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .get('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents/INTENT_ID')
        .reply(200, '{"botId": "BOT_ID", "intentId":"INTENT_ID", "intentName":"INTENT_NAME", "botVersion":"DRAFT", "localeId":"BOT_LOCALE_ID"}');

      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents/INTENT_ID')
        .reply(200, '{"intentId": "INTENT_ID"}');

      response = await handler(fixtures.v2.events.intentPriority.create, {});
    });

    it('creates a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
      expect(getScope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('INTENT_ID-priority');
    });
  });

  describe('with an update event', () => {
    let scope: nock.Scope;
    let getScope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      getScope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .get('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents/INTENT_ID')
        .reply(200, '{"botId": "BOT_ID", "intentId":"INTENT_ID", "intentName":"INTENT_NAME", "botVersion":"DRAFT", "localeId":"BOT_LOCALE_ID"}');

      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents/INTENT_ID')
        .reply(200, '{"intentId": "INTENT_ID"}');

      response = await handler(fixtures.v2.events.intentPriority.update, {});
    });

    it('updates a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
      expect(getScope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('INTENT_ID-priority');
    });
  });

  describe('with an unknown event type', () => {
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents/INTENT_ID')
        .reply(200);

      nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .get('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents/INTENT_ID')
        .reply(200, '{"botId": "BOT_ID", "intentId":"INTENT_ID", "intentName":"INTENT_NAME", "botVersion":"DRAFT", "localeId":"BOT_LOCALE_ID"}');
      response = await handler(fixtures.v2.events.intentPriority.unknown, {});
    });

    describe('with an unknown event type', () => {
      it('throws an error', async () => {
        expect(response).toStrictEqual({});
      });
    });

    describe('with an internal error', () => {
      it('throws an error', async () => {
        expect.assertions(1);
        // Error: TypeError: Cannot read property 'props' of undefined
        await expect(handler({}, {})).rejects.toBeInstanceOf(Error);
      });
    });
  });
});
