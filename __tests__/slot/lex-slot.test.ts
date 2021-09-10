import LexSlot from '../../src/slot/lex-slot';
import {
  SlotConstraint,
} from '@aws-sdk/client-lex-models-v2';

describe('Lex v2 Slot class', () => {
  describe('Create a new instance of the slot class', () => {
    let instance: LexSlot;

    beforeAll(async () => {
      instance = new LexSlot({
        botId: 'SampleBotID',
        intentId: 'SampleIntentID',
        localeId: 'en-US',
        slotName: 'Sampleslot',
        valueElicitationSetting: {
          slotConstraint: SlotConstraint.Required,
        },
        priority: 1,
      });
    });

    it('Creates a new instance of the slot v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Retrieves the name properly', () => {
      expect(instance.Name).toBe('Sampleslot');
    });
  });
});
