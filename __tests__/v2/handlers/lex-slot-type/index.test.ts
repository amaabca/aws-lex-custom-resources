import nock from 'nock';
import { handler } from '../../../../src/v2/handlers/lex-slot-type/index.js';
import fixtures from '../../../../__fixtures__';

describe('v2-lex-slot-type-handler', () => {
  describe('with a create event', () => {
    let response: { PhysicalResourceId?: string };
    let scope: nock.Scope;

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/DRAFT/botlocales/en_US/slottypes')
        .reply(200, '{"slotTypeId":"SLOT_TYPE_ID"}');
      response = await handler(fixtures.v2.events.slotType.create, {});
    });

    it('creates a slot type via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('SLOT_TYPE_ID');
    });
  });

  describe('with an update event', () => {
    let response: { PhysicalResourceId?: string };
    let scope: nock.Scope;

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .put('/bots/BOT_ID/botversions/DRAFT/botlocales/en_US/slottypes/SLOT_TYPE_ID')
        .reply(202, '{"slotTypeId":"SLOT_TYPE_ID"}');
      response = await handler(fixtures.v2.events.slotType.update, {});
    });

    it('updates a slot type via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('SLOT_TYPE_ID');
    });
  });

  describe('with a delete event', () => {
    let response: { PhysicalResourceId?: string };
    let scope: nock.Scope;

    beforeAll(async () => {
      scope = nock('https://models-v2-lex.us-east-1.amazonaws.com/')
        .delete('/bots/BOT_ID/botversions/DRAFT/botlocales/en_US/slottypes/SLOT_TYPE_ID')
        .reply(204, '');
      response = await handler(fixtures.v2.events.slotType.delete, {});
    });

    it('deletes a slot type via the SDK', () => {
      expect(scope.isDone()).toBe(true);
    });

    it('returns the PhysicalResourceId', () => {
      expect(response.PhysicalResourceId).toBe('SLOT_TYPE_ID');
    });
  });

  describe('with an unknown event type', () => {
    it('throws an error', async () => {
      expect.assertions(1);
      await expect(handler(fixtures.v2.events.slotType.unknown, {})).rejects.toEqual(
        new Error('WAFFLE is not supported!')
      );
    });
  });
});
