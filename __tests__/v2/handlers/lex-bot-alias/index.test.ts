import nock from 'nock';
import { handler } from '../../../../src/v2/handlers/lex-bot-alias/index.js';
import fixtures from '../../../../__fixtures__';

describe('v2-lex-bot-alias-handler', () => {
  describe('with a create event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botaliases')
        .reply(200, '{"botAliasId":"BOT_ALIAS_ID"}');
      response = await handler(fixtures.v2.events.botAlias.create, {});
    });

    it('creates a bot-alias via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('BOT_ALIAS_ID');
    });
  });

  describe('with an update event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botaliases/BOT_ALIAS_ID')
        .reply(200, '{"botAliasId":"BOT_ALIAS_ID"}');
      response = await handler(fixtures.v2.events.botAlias.update, {});
    });

    it('updates a bot-alias via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('BOT_ALIAS_ID');
    });
  });

  describe('with an delete event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .delete('/bots/BOT_ID/botaliases/BOT_ALIAS_ID')
        .reply(200, '{"botAliasId":"BOT_ALIAS_ID"}');
      response = await handler(fixtures.v2.events.botAlias.delete, {});
    });

    it('delete a bot-alias via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('BOT_ALIAS_ID');
    });
  });

  describe('with an unknown event type', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      await expect(handler(fixtures.v2.events.botAlias.unknown, {})).rejects.toEqual(
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
