import * as cdk from '@aws-cdk/core';
import { LexSlotAttributes } from '../lex-data-types'

export default class LexSlot extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexSlotAttributes;
  resource: cdk.CustomResource;

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexSlotAttributes) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.description = `${id} V2 Slot`;

    this.resource = new cdk.CustomResource(scope, `${id}_Custom_V2_Slot`, {
      serviceToken: cdk.Fn.importValue(serviceToken),
      properties: {
        props: JSON.stringify(this.props)
      }
    });
  }

  getResource(): cdk.CustomResource {
    return this.resource;
  }
}
