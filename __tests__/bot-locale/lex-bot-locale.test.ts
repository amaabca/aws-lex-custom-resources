import { LexBotLocale, LexIntent, LexSlotType } from '../../src/';

describe('LexBotLocale', () => {
  const instance = new LexBotLocale({
    nluIntentConfidenceThreshold: 0.8,
    localeId: 'en_US',
  });

  describe('botLocale', () => {
    it('props contains the correct localeId', () => {
      expect(instance.props.localeId).toBe('en_US');
    });

    describe('addSlotType', () => {
      let slotType: LexSlotType;

      beforeAll(() => {
        slotType = instance.addSlotType({
          slotTypeName: 'SampleSlotType',
          valueSelectionSetting: {
            resolutionStrategy: 'TOP_RESOLUTION',
          },
        });
      });

      it('correctly added a new slottype', () => {
        expect(slotType).toBeInstanceOf(LexSlotType);
        expect(instance.slotTypes[0]).toEqual(slotType);
      });

      describe('duplicate slot type name', () => {
        it('throws error', () => {
          expect(() => {
            instance.addSlotType({
              slotTypeName: 'SampleSlotType',
              valueSelectionSetting: {
                resolutionStrategy: 'TOP_RESOLUTION',
              },
            });
          }).toThrow();
        });
      });
    });

    describe('addIntent', () => {
      let intent: LexIntent;

      beforeAll(() => {
        intent = instance.addIntent({
          intentName: 'SampleIntent',
        });
      });

      it('correctly added a new intent', () => {
        expect(intent).toBeInstanceOf(LexIntent);
        expect(instance.intents[0]).toEqual(intent);
      });

      describe('duplicate intent name', () => {
        it('throws error', () => {
          expect(() => {
            instance.addIntent({ intentName: 'SampleIntent' });
          }).toThrow();
        });
      });
    });

    describe('definition', () => {
      beforeAll(() => {
        instance.addIntent({
          intentName: 'SampleIntent2',
        });
        instance.addSlotType({
          slotTypeName: 'SampleSlotType2',
          valueSelectionSetting: {
            resolutionStrategy: 'TOP_RESOLUTION',
          },
        });
      });

      it('creates json object containing proper fields for CR', () => {
        const definition = instance.definition();
        expect(definition['CR.slotTypes'].length).toBe(2);
        expect(definition['CR.intents'].length).toBe(2);
      });
    });
  });
});
