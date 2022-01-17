import { Construct } from 'constructs';
import { CfnResource, Reference } from 'aws-cdk-lib';
import { LexBotAlias, LexBotVersion } from '..';
import { LexBotAliasAttributes, LexBotAttributes } from '../lex-data-types';

export default class extends Construct {
  serviceToken: string | Reference;
  scope: Construct;
  resource: CfnResource;

  constructor(scope: Construct, id: string, serviceToken: string | Reference, props: LexBotAttributes) {
    super(scope, id);
    this.scope = scope;
    this.serviceToken = serviceToken;

    this.resource = new CfnResource(scope, `LexBot-${id}`, {
      type: 'Custom::LexBot',
      properties: {
        ServiceToken: serviceToken,
        ...props,
      },
    });
  }

  automaticVersion(): LexBotVersion {
    return new LexBotVersion(this.scope, 'AutomaticVersion', this.serviceToken, {
      botId: this.botId(),
      'CR.botLocaleIds': this.botLocaleIds(),
      'CR.lastUpdatedDateTime': this.lastUpdatedDateTime(),
    });
  }

  addAlias(aliasProps: LexBotAliasAttributes): LexBotAlias {
    return new LexBotAlias(this.scope, `BotAlias-${aliasProps.botAliasName}`, this.serviceToken, {
      botId: this.botId(),
      ...aliasProps,
    });
  }

  lastUpdatedDateTime(): Reference {
    return this.resource.getAtt('lastUpdatedDateTime');
  }

  botId(): Reference {
    return this.resource.getAtt('botId');
  }

  botLocaleIds(): Reference {
    return this.resource.getAtt('botLocaleIds');
  }
}
