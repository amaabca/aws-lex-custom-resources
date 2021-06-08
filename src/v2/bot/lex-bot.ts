import * as cdk from '@aws-cdk/core';
import { CreateBotCommandInput } from '@aws-sdk/client-lex-models-v2';
import { LexModelsV2Client, ListBotsCommand, BotFilterName, BotFilterOperator } from '@aws-sdk/client-lex-models-v2';


export default class LexBot extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: CreateBotCommandInput;

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: CreateBotCommandInput) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.description = `${id} V2 Bot`;
    this.props.botName = id;

    if (this.validName()) {
      const _customResource = new cdk.CustomResource(scope, `${id}_Custom_V2_Lex_Bot`, {
        serviceToken: cdk.Fn.importValue(serviceToken),
        properties: {
          props: JSON.stringify(this.props)
        }
      });
    } else {
      throw new Error("Bot names must only contain letters, numbers and non repeating underscores");
    }
  }

  validName(): boolean {
    return new RegExp("^[A-Za-z0-9]+(_[A-Za-z0-9]+)*$").test(this.id);
  }

  getName(): string {
    return this.props.botName!;
  }
}
