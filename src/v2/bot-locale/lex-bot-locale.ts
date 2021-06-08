import * as cdk from '@aws-cdk/core';
import { CreateBotLocaleCommandInput } from '@aws-sdk/client-lex-models-v2';

export default class LexBotLocale extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: CreateBotLocaleCommandInput;

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: CreateBotLocaleCommandInput) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.description = `${id} V2 Bot Locale`;

    const _customResource = new cdk.CustomResource(scope, `${id}_Custom_V2_Lex_Intent`, {
      serviceToken: cdk.Fn.importValue(serviceToken),
      properties: {
        props: JSON.stringify(this.props)
      }
    });
  }
}
