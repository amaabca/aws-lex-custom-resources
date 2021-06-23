import * as cdk from '@aws-cdk/core';
import { LexIntentPriorityAttributes } from '../lex-data-types';

export default class LexIntentPriority extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexIntentPriorityAttributes;
  resource: cdk.CustomResource;

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexIntentPriorityAttributes) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;

    this.resource = new cdk.CustomResource(scope, `${id}_Custom_V2_Lex_IntentPriority`, {
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
