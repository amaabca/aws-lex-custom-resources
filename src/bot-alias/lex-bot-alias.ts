import * as cdk from '@aws-cdk/core';
import { LexBotAliasAttributes } from '../lex-data-types'

export default class LexBotAlias extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexBotAliasAttributes;

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexBotAliasAttributes) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.description = `${id} V2 Bot Alias`;

    new cdk.CustomResource(scope, `${id}_Custom_V2_Lex_Bot_Alias`, {
      serviceToken: cdk.Fn.importValue(serviceToken),
      properties: {
        props: JSON.stringify(this.props),
      },
    });
  }
}