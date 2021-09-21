import {
  LexSlot,
} from '..';
import {
  LexIntentAttributes,
  LexSlotAttributes,
} from '../lex-data-types';

export default class {
  props: LexIntentAttributes;
  slots: LexSlot[];

  constructor(props: LexIntentAttributes) {
    this.props = props;
    this.slots = [];
  }

  addSlot(props: LexSlotAttributes) {
    const slot = new LexSlot(props);
    this.slots.push(slot);
    return slot;
  }

  definition() {
    const configuration = { ...this.props };
    configuration['CR.slots'] = this.slots.map((s) => s.definition());
    return configuration;
  }
}
