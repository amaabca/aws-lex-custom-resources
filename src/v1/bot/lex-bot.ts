import * as cdk from '@aws-cdk/core';
import { LexBotAttributes } from '../lex-data-types';

export default class LexBot extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexBotAttributes;

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexBotAttributes) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    const description = `${id} Bot`;
    this.props.name = id;

    if (this.validName()) {
      new cdk.CustomResource(scope, `${id}_Custom_Lex_Bot`, {
        serviceToken: cdk.Fn.importValue(serviceToken),
        properties: {
          description,
          props: JSON.stringify(this.props)
        }
      });
    } else {
      throw new Error("Bot names must only contain letters and non repeating underscores");
    }
  }

  validName(): boolean {
    return new RegExp("^[A-Za-z]+(_[A-Za-z]+)*$").test(this.id);
  }
}
