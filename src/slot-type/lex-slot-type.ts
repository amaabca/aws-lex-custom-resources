import { LexSlotTypeAttributes } from '../lex-data-types';

export default class LexSlotType {
  props: LexSlotTypeAttributes;

  constructor(props: LexSlotTypeAttributes) {
    this.props = props;
  }

  definition() {
    return this.props;
  }
}
