import * as cdk from '@aws-cdk/core';
import { LexIntentAttributes, LexIntentCDK } from '../lex-data-types';

export default class LexIntent extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexIntentAttributes;

  // the service token must match the exported service token by the lex-intent stack
  constructor(scope: cdk.Stack, id: string, serviceToken: string, props: LexIntentAttributes) {
    super(scope, id);
    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.name = id;
    this.props.description = `${id} Intent`;


    new cdk.CustomResource(scope, `${id}_Custom_Lex_Intent`, {
      serviceToken: cdk.Fn.importValue(serviceToken),
      properties: {
        description: this.props.description,
        props: JSON.stringify(this.props)
      }
    });
  }

  toCDK(version?: string): LexIntentCDK {
    return {
      intentName: this.props.name!,
      intentVersion: version ? version : "$LATEST"
    }
  }
}
