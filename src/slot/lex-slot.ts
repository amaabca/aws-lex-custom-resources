import * as cdk from '@aws-cdk/core';
import { LexSlotAttributes } from '../lex-data-types'

export default class LexSlot {
  props: LexSlotAttributes;
  resource?: cdk.CustomResource;

  constructor(props: LexSlotAttributes) {
    this.props = props;
  }

  get Resource(): cdk.CustomResource | undefined {
    return this.resource;
  }

  set Resource(r: cdk.CustomResource | undefined) {
    this.resource = r;
  }

  get Name(): string {
    return this.props.slotName;
  }
}
