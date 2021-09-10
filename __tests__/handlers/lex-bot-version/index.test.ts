import nock from 'nock';
import { handler } from '../../../src/handlers/lex-bot-version/index.js';
import fixtures from '../../../__fixtures__';

describe('v2-lex-bot-version-handler', () => {
  describe('with a create event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions')
        .reply(202, '{"botVersion":"BOT_VERSION_ID"}');
      response = await handler(fixtures.v2.events.botVersion.create, {});
    });

    it('creates a bot-version via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('BOT_VERSION_ID');
    });
  });

  // NOTE: updating a bot version is a no-op, it returns the same id.
  describe('with an update event', () => {
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      response = await handler(fixtures.v2.events.botVersion.update, {});
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('BOT_VERSION_ID');
    });
  });

  describe('with an delete event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .delete('/bots/BOT_ID/botversions/BOT_VERSION_ID')
        .reply(200, '{"botVersion":"BOT_VERSION_ID"}');
      response = await handler(fixtures.v2.events.botVersion.delete, {});
    });

    it('delete a bot-version via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('BOT_VERSION_ID');
    });
  });

  describe('with an unknown event type', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      await expect(handler(fixtures.v2.events.botVersion.unknown, {})).rejects.toEqual(
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
