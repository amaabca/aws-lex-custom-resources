import { LexSlot } from '..';
import { LexIntentAttributes, LexSlotAttributes } from '../lex-data-types';

export default class {
  props: LexIntentAttributes;
  slots: LexSlot[];

  constructor(props: LexIntentAttributes) {
    this.props = props;
    this.slots = [];
  }

  addSlot(props: LexSlotAttributes): LexSlot {
    let exists = false;

    for (let i = 0; i < this.slots.length; i++) {
      if (this.slots[i].props.slotName === props.slotName) {
        exists = true;
        break;
      }
    }

    if (exists) {
      throw new Error(`A slot with the name ${props.slotName} already exists!`);
    } else {
      const slot = new LexSlot(props);
      this.slots.push(slot);
      return slot;
    }
  }

  definition(): any {
    const configuration = { ...this.props };
    configuration['CR.slots'] = this.slots.map((s) => s.definition());
    return configuration;
  }
}
