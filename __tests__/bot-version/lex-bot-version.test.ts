import { App, Stack } from 'aws-cdk-lib';

import { LexBotVersion } from '../../src/';

describe('LexBotVersion', () => {
  const props = {
    botId: '1234',
    'CR.botLocaleIds': '1234',
    'CR.lastUpdatedDateTime': '2021-09-23T17:45:56Z',
  };
  const serviceToken = 'arn:partition:service:region:account-id:resource-type:resource-id';
  const app = new App();
  const scope = new Stack(app, 'Stack');
  const instance = new LexBotVersion(scope, 'Id', serviceToken, props);

  describe('botVersion', () => {
    it('returns the bot version token', () => {
      expect(instance.botVersion().toString()).toMatch(/Token\[Id\.botVersion\.\d+\]/);
    });
  });
});
