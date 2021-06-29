import nock from 'nock';
import { handler } from '../../../../src/v2/handlers/lex-bot/index.js';
import fixtures from '../../../../__fixtures__';

describe('v2-lex-bot-handler', () => {
  describe('with a create event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots')
        .reply(200, '{"botId":"123"}');
      response = await handler(fixtures.v2.events.bot.create, {});
    });

    it('creates a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('123');
    });
  });

  describe('with an update event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/1234')
        .reply(200, '{"botId":"1234"}');
      response = await handler(fixtures.v2.events.bot.update, {});
    });

    it('updates a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('1234');
    });
  });

  describe('with a delete event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .delete('/bots/1234')
        .reply(200, '{"botId":"1234"}');
      response = await handler(fixtures.v2.events.bot.delete, {});
    });

    it('deletes a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('1234');
    });
  });

  describe('with an unknown event type', () => {
    let response: { PhysicalResourceId?: string };

    it('throws an error', async () => {
      expect.assertions(1);
      await expect(handler(fixtures.v2.events.bot.unknown, {})).rejects.toEqual(
        new Error('Event request type unknown!')
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
