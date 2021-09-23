import {
  CfnResource,
  Construct,
  Reference,
  RemovalPolicy,
} from '@aws-cdk/core';
import { LexBotAliasAttributes } from '../lex-data-types'

export default class extends Construct {
  resource: CfnResource;

  constructor(
    scope: Construct,
    id: string,
    serviceToken: string | Reference,
    props: LexBotAliasAttributes
  ) {
    super(scope, id);

    this.resource = new CfnResource(
      this,
      id,
      {
        type: 'Custom::LexBotAlias',
        properties: {
          ServiceToken: serviceToken,
          ...props,
        },
      }
    );
    // the custom resource will take care of cleaning this up
    this.resource.applyRemovalPolicy(RemovalPolicy.RETAIN);
  }
}
