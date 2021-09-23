import {
  CfnResource,
  Construct,
  Reference,
  RemovalPolicy,
} from '@aws-cdk/core';
import { LexBotVersionAttributes } from '../lex-data-types'

export default class extends Construct {
  resource: CfnResource;

  constructor(
    scope: Construct,
    id: string,
    serviceToken: string | Reference,
    props: LexBotVersionAttributes
  ) {
    super(scope, id);

    this.resource = new CfnResource(
      this,
      id,
      {
        type: 'Custom::LexBotVersion',
        properties: {
          ServiceToken: serviceToken,
          ...props,
        },
      }
    );
    // the custom resource will take care of cleaning this up
    this.resource.applyRemovalPolicy(RemovalPolicy.RETAIN);
  }

  botVersion(): Reference {
    return this.resource.getAtt('botVersion');
  }
}
