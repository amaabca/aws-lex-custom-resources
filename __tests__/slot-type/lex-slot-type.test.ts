import { SlotValueResolutionStrategy } from '@aws-sdk/client-lex-models-v2';

import LexSlotType from '../../src/slot-type/lex-slot-type';

describe('Lex v2 Slot-Type class', () => {
  describe('Create a new instance of the slot-type class', () => {
    let instance: LexSlotType;

    beforeAll(async () => {
      instance = new LexSlotType({
        localeId: 'en-US',
        slotTypeName: 'SampleSlotType',
        valueSelectionSetting: {
          resolutionStrategy: SlotValueResolutionStrategy.TopResolution,
        },
      });
    });

    it('Gets the correct name', () => {
      expect(instance.Name).toBe('SampleSlotType');
    });

    it('Creates a new instance of the slot-type v2 class', () => {
      expect(instance).not.toBeNull();
    });
  });
});
