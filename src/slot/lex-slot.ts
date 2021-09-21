import { LexSlotAttributes } from '../lex-data-types'

export default class {
  props: LexSlotAttributes;

  constructor(props: LexSlotAttributes) {
    this.props = props;
  }

  definition() {
    const { slotTypeName, ...rest } = this.props;
    const configuration = { ...rest };
    configuration['CR.slotTypeName'] = slotTypeName;
    return configuration;
  }
}
