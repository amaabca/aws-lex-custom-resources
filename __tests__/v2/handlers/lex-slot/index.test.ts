import nock from 'nock';
import { handler } from '../../../../src/v2/handlers/lex-slot/index.js';
import fixtures from '../../../../__fixtures__';

describe('v2-lex-slot-handler', () => {
  describe('with a create event', () => {
    let response: { PhysicalResourceId?: string };
    let scope: nock.Scope;

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/DRAFT/botlocales/en_US/intents/INTENT_ID/slots')
        .reply(200, '{"slotId":"SLOT_ID"}');
      response = await handler(fixtures.v2.events.slot.create, {});
    });

    it('creates a slot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('SLOT_ID');
    });
  });

  describe('with an update event', () => {
    let response: { PhysicalResourceId?: string };
    let scope: nock.Scope;

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/DRAFT/botlocales/en_US/intents/INTENT_ID/slots/SLOT_ID')
        .reply(200, '{"slotId":"SLOT_ID"}');
      response = await handler(fixtures.v2.events.slot.update, {});
    });

    it('updates a slot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('SLOT_ID');
    });
  });

  describe('with a delete event', () => {
    let scope: nock.Scope;
    let response: { PhysicalResourceId?: string };

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .delete('/bots/BOT_ID/botversions/DRAFT/botlocales/en_US/intents/INTENT_ID/slots/SLOT_ID')
        .reply(204, '');
      response = await handler(fixtures.v2.events.slot.delete, {});
    });

    it('deletes a slot via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('SLOT_ID');
    });
  });

  describe('with an unknown event type', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      await expect(handler(fixtures.v2.events.slot.unknown, {})).rejects.toEqual(
        new Error('WAFFLE is not supported!')
      );
    });
  });
});
