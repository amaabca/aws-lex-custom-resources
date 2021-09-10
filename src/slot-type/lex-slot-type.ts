import * as cdk from '@aws-cdk/core';

import { LexSlotTypeAttributes } from '../lex-data-types';

export default class LexSlotType {
  props: LexSlotTypeAttributes;
  resource?: cdk.CustomResource;

  constructor(props: LexSlotTypeAttributes) {
    this.props = props;
  }

  get Name(): string {
    return this.props.slotTypeName;
  }

  get Resource(): cdk.CustomResource | undefined {
    return this.resource;
  }

  set Resource(r: cdk.CustomResource | undefined) {
    this.resource = r;
  }
}
