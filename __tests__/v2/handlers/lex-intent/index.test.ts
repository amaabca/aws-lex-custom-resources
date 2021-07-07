import nock from 'nock';
import { handler } from '../../../../src/v2/handlers/lex-intent/index.js';
import fixtures from '../../../../__fixtures__';

nock.emitter.on('no match', req => {
  const r = req;
  console.error(r);
})

describe('v2-lex-intent-handler', () => {
  describe('with a create event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/E2MGJRZBQA/botversions/DRAFT/botlocales/en_US/intents')
        .reply(200, () => '{"intentId":"123"}');
      response = await handler(fixtures.v2.events.intent.create, {});
    });

    it('creates a intent via the SDK', () => {
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
        .put('/bots/E2MGJRZBQA/botversions/DRAFT/botlocales/en_US/intents/1234')
        .reply(200, '{"intentId":"1234"}');
      response = await handler(fixtures.v2.events.intent.update, {});
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
        .delete('/bots/E2MGJRZBQA/botversions/DRAFT/botlocales/en_US/intents/1234')
        .reply(200, '{"intentId":"1234"}');
      response = await handler(fixtures.v2.events.intent.delete, {});
    });

    it('deletes a bot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('1234');
    });
  });

  describe('with an unknown event type', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      await expect(handler(fixtures.v2.events.intent.unknown, {})).rejects.toEqual(
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
