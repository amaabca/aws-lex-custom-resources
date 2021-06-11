import * as cdk from '@aws-cdk/core';
import { CreateIntentCommandInput } from '@aws-sdk/client-lex-models-v2';
import { LexIntentAttributes } from '../lex-data-types';

export default class LexIntent extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexIntentAttributes;
  resource: cdk.CustomResource;

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexIntentAttributes) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.description = `${id} V2 Intent`;
    this.props.intentName = id;

    this.resource = new cdk.CustomResource(scope, `${id}_Custom_V2_Lex_Intent`, {
      serviceToken: cdk.Fn.importValue(serviceToken),
      properties: {
        props: JSON.stringify(this.props)
      }
    });
  }

  getName(): string {
    return this.id;
  }

  getResource(): cdk.CustomResource {
    return this.resource;
  }
}
