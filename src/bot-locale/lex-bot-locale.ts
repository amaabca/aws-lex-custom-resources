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
    // check if a slottype with this name already exists
    let exists = false;
    for (let i = 0; i < this.slotTypes.length; i++) {
      if (this.slotTypes[i].props.slotTypeName === slotTypeProps.slotTypeName) {
        exists = true;
        break;
      }
    }

    if (exists) {
      throw new Error(`A slot type with the name ${slotTypeProps.slotTypeName} already exists!`);
    } else {
      const slotType = new LexSlotType(slotTypeProps);
      this.slotTypes.push(slotType);
      return slotType;
    }
  }

  addIntent(intentProps: LexIntentAttributes): LexIntent {
    // check if a slottype with this name already exists
    let exists = false;
    for (let i = 0; i < this.intents.length; i++) {
      if (this.intents[i].props.intentName === intentProps.intentName) {
        exists = true;
        break;
      }
    }

    if (exists) {
      throw new Error(`An intent with the name ${intentProps.intentName} already exists!`);
    } else {
      const intent = new LexIntent(intentProps);
      this.intents.push(intent);
      return intent;
    }
  }

  definition(): any {
    const configuration = { ...this.props };
    configuration['CR.slotTypes'] = this.slotTypes.map((s) => s.definition());
    configuration['CR.intents'] = this.intents.map((i) => i.definition());
    return configuration;
  }
}
