import * as cdk from '@aws-cdk/core';
import { LexSlotTypeAttributes } from '../lex-data-types'

export default class LexSlotType extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexSlotTypeAttributes;
  resource: cdk.CustomResource;

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexSlotTypeAttributes) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.description = `${id} V2 Slot Type`;

    this.resource = new cdk.CustomResource(scope, `${id}_Custom_V2_Slot_Type`, {
      serviceToken: cdk.Fn.importValue(serviceToken),
      properties: {
        props: JSON.stringify(this.props)
      }
    });
  }


  getName(): string {
    return this.props.slotTypeName;
  }

  getResource(): cdk.CustomResource {
    return this.resource;
  }
}
