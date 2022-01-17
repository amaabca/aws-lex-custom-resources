import { LexIntent, LexSlot } from '../../src/';

describe('LexIntent', () => {
  const instance = new LexIntent({
    intentName: 'TestIntent',
  });

  describe('Created properly', () => {
    it('has an intent name of TestIntent', () => {
      expect(instance.props.intentName).toBe('TestIntent');
    });

    describe('addSlot', () => {
      let slot: LexSlot;

      beforeAll(() => {
        slot = instance.addSlot({
          slotName: 'TestSlot',
          slotTypeName: 'AMAZON.Number',
          valueElicitationSetting: {
            slotConstraint: 'REQUIRED',
          },
        });
      });

      it('adds a slot properly', () => {
        expect(slot).toBeInstanceOf(LexSlot);
        expect(instance.slots.length).toBe(1);
      });

      it('throws error on duplicate slot name', () => {
        expect(() => {
          instance.addSlot({
            slotName: 'TestSlot',
            slotTypeName: 'AMAZON.Number',
            valueElicitationSetting: {
              slotConstraint: 'REQUIRED',
            },
          });
        }).toThrow();
      });
    });

    describe('definition', () => {
      it('creates a json object for the definition', () => {
        const definition = instance.definition();
        expect(definition['CR.slots'].length).toBe(1);
      });
    });
  });
});
