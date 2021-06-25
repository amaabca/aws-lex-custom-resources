import * as cdk from '@aws-cdk/core';
import { LexSlotTypeAttributes } from '../lex-data-types';

export default class LexSlotType extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexSlotTypeAttributes;

  // the service token must match the exported service token by the lex-intent stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexSlotTypeAttributes) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.description = `${id} SlotType`;
    this.props.name = id;

    new cdk.CustomResource(scope, `${id}_Custom_Lex_Slot_Type`, {
      serviceToken: cdk.Fn.importValue(serviceToken),
      properties: {
        description: this.props.description,
        props: JSON.stringify(props)
      }
    });
  }

  slotTypeName(): string {
    return this.id;
  }
}
