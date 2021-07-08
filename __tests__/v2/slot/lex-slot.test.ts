import LexSlot from '../../../src/v2/slot/lex-slot';
import {
  SlotConstraint,
} from '@aws-sdk/client-lex-models-v2';
import * as cdk from '@aws-cdk/core';

describe('Lex v2 Slot class', () => {
  describe('Create a new instance of the slot class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexSlot;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexSlot(sampleStack, 'SampleSlot', 'sampleServiceToken', {
        botId: 'SampleBotID',
        intentId: 'SampleIntentID',
        localeId: 'en-US',
        slotName: 'Sampleslot',
        slotTypeId: 'SomeCustomSlotType',
        valueElicitationSetting: {
          slotConstraint: SlotConstraint.Required,
        },
        priority: 1,
      });
    });

    it('Creates a new instance of the slot v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Gets the cfn resource properly', () => {
      expect(instance.getResource() instanceof cdk.CustomResource).toBe(true);
    });
  });
});
