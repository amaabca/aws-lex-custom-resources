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
});
