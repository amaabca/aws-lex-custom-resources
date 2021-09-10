import * as cdk from '@aws-cdk/core';
import { LexBotVersionAttributes } from '../lex-data-types'

export default class LexBotVersion extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexBotVersionAttributes;
  resource: cdk.CustomResource;

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexBotVersionAttributes) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.description = `${id} V2 Bot Locale`;

    this.resource = new cdk.CustomResource(scope, `${id}_Custom_V2_Lex_Bot_Version`, {
      serviceToken: cdk.Fn.importValue(serviceToken),
      properties: {
        props: JSON.stringify(this.props),
      },
    });
  }

  getResource(): cdk.CustomResource {
    return this.resource;
  }
}