import {
  LexIntent,
  LexSlotType,
} from '..';
import {
  LexBotLocaleAttributes,
  LexSlotTypeAttributes,
  LexIntentAttributes,
} from '../lex-data-types'

export default class {
  props: LexBotLocaleAttributes;
  slotTypes: LexSlotType[];
  intents: LexIntent[];

  constructor(props: LexBotLocaleAttributes) {
    this.props = props;
    this.intents = [];
    this.slotTypes = [];
  }

  addSlotType(slotTypeProps: LexSlotTypeAttributes): LexSlotType {
    const slotType = new LexSlotType(slotTypeProps);
    this.slotTypes.push(slotType);
    return slotType;
  }

  addIntent(intentProps: LexIntentAttributes): LexIntent {
    const intent = new LexIntent(intentProps);
    this.intents.push(intent);
    return intent;
  }

  definition(): any {
    const configuration = { ...this.props };
    configuration['CR.slotTypes'] = this.slotTypes.map((s) => s.definition());
    configuration['CR.intents'] = this.intents.map((i) => i.definition());
    return configuration;
  }
}
