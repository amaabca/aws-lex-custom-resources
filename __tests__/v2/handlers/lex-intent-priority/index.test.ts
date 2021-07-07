import nock from 'nock';

import fixtures from '../../../../__fixtures__';
import { handler } from '../../../../src/v2/handlers/lex-intent-priority/index.js';

describe('v2-lex-bot-handler', () => {
  describe('with a create event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/PV9UMAT2FI/botversions/DRAFT/botlocales/en_US/intents/WLHH5JOT4T')
        .reply(200, '{"intentId": "WLHH5JOT4T"}');
      response = await handler(fixtures.v2.events.intentPriority.create, {});
    });

    it('creates a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('WLHH5JOT4T-priority');
    });
  });

  describe('with an update event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/PV9UMAT2FI/botversions/DRAFT/botlocales/en_US/intents/WLHH5JOT4T')
        .reply(200, '{"intentId": "WLHH5JOT4T"}');
      response = await handler(fixtures.v2.events.intentPriority.update, {});
    });

    it('updates a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('WLHH5JOT4T-priority');
    });
  });

  describe('with an unknown event type', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/PV9UMAT2FI/botversions/DRAFT/botlocales/en_US/intents/WLHH5JOT4T')
        .reply(200);
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
