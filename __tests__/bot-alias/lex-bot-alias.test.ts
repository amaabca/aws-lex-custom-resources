import {
  App,
  CfnResource,
  Stack,
} from 'aws-cdk-lib';

import {
  LexBotAlias,
} from '../../src/';

describe('LexBotAlias', () => {
  const serviceToken = 'arn:partition:service:region:account-id:resource-type:resource-id';
  const app = new App();
  const scope = new Stack(app, 'Stack');
  const instance = new LexBotAlias(
    scope,
    'Id',
    serviceToken,
    {
      botAliasName: 'Test',
      botAliasLocaleSettings: {
        ['en_US']: {
          enabled: true,
        },
      },
    }
  );

  describe('attributes', () => {
    it('has a cfn resource', () => {
      expect(instance.resource).toBeInstanceOf(CfnResource);
    });

    it('cfn resource has a removal policy of retain', () => {
      expect(instance.resource.cfnOptions.deletionPolicy).toEqual('Retain');
    });
  });
});
