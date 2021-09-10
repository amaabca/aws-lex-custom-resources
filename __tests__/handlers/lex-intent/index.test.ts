import nock from 'nock';
import { handler } from '../../../src/handlers/lex-intent/index.js';
import fixtures from '../../../__fixtures__';

describe('v2-lex-intent-handler', () => {
  describe('with a create event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents')
        .reply(200, () => '{"intentId":"INTENT_ID"}');
      response = await handler(fixtures.v2.events.intent.create, {});
    });

    it('creates a intent via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('INTENT_ID');
    });
  });

  describe('with an update event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents/INTENT_ID')
        .reply(200, '{"intentId":"INTENT_ID"}');

      nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .get('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents/INTENT_ID')
        .reply(200, '{"botId": "BOT_ID", "intentId":"INTENT_ID", "intentName":"INTENT_NAME", "botVersion":"DRAFT", "localeId":"BOT_LOCALE_ID"}');

      response = await handler(fixtures.v2.events.intent.update, {});
    });

    it('updates a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('INTENT_ID');
    });
  });

  describe('with a delete event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .delete('/bots/BOT_ID/botversions/DRAFT/botlocales/BOT_LOCALE_ID/intents/INTENT_ID')
        .reply(200, '{"intentId":"INTENT_ID"}');
      response = await handler(fixtures.v2.events.intent.delete, {});
    });

    it('deletes a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('INTENT_ID');
    });
  });

  describe('with an unknown event type', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      await expect(handler(fixtures.v2.events.intent.unknown, {})).rejects.toEqual(
        new Error('WAFFLE is not supported!')
      );
    });
  });

  describe('with an internal error', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      // Error: TypeError: Cannot read property 'props' of undefined
      await expect(handler({}, {})).rejects.toBeInstanceOf(TypeError);
    });
  });
});
