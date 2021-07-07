import * as cdk from '@aws-cdk/core';
import { SlotValueResolutionStrategy } from '@aws-sdk/client-lex-models-v2';

import LexSlotType from '../../../src/v2/slot-type/lex-slot-type';

describe('Lex v2 Slot-Type class', () => {
  describe('Create a new instance of the slot-type class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexSlotType;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexSlotType(sampleStack, 'SampleSlotType', 'sampleServiceToken', {
        botId: 'SampleBotID',
        localeId: 'en-US',
        slotTypeName: 'SampleSlotType',
        valueSelectionSetting: {
          resolutionStrategy: SlotValueResolutionStrategy.TopResolution,
        },
      });
    });

    it('Gets the correct name', () => {
      expect(instance.getName()).toBe('SampleSlotType');
    });

    it('Creates a new instance of the slot-type v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Gets the cfn resource properly', () => {
      expect(instance.getResource() instanceof cdk.CustomResource).toBe(true);
    });
  });
});
