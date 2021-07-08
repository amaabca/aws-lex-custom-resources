import nock from 'nock';
import { handler } from '../../../../src/v2/handlers/lex-bot-locale/index.js';
import fixtures from '../../../../__fixtures__';

describe('v2-lex-bot-locale-handler', () => {
  describe('with a create event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/1/botlocales')
        .reply(202, '{"localeId":"BOT_LOCALE_ID"}');
      response = await handler(fixtures.v2.events.botLocale.create, {});
    });

    it('creates a bot-locale via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('BOT_LOCALE_ID');
    });
  });

  describe('with an update event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/1/botlocales/BOT_LOCALE_ID')
        .reply(200, '{"localeId":"BOT_LOCALE_ID"}');
      response = await handler(fixtures.v2.events.botLocale.update, {});
    });

    it('updates a bot-locale via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('BOT_LOCALE_ID');
    });
  });

  describe('with an delete event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .delete('/bots/BOT_ID/botversions/1/botlocales/BOT_LOCALE_ID')
        .reply(202, '{"localeId":"BOT_LOCALE_ID"}');
      response = await handler(fixtures.v2.events.botLocale.delete, {});
    });

    it('delete a bot-locale via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('BOT_LOCALE_ID');
    });
  });

  describe('with an unknown event type', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      await expect(handler(fixtures.v2.events.botLocale.unknown, {})).rejects.toEqual(
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
