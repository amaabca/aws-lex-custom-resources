import {
  App,
  Stack,
} from '@aws-cdk/core';

import {
  LexCustomResource,
} from '../../src/';

describe('LexCustomResource', () => {
  const props = {
    semanticVersion: '0.1.0',
    logLevel: 'DEBUG',
  };
  const app = new App();
  const scope = new Stack(app, 'Stack');
  const instance = new LexCustomResource(
    scope,
    'Id',
    props
  );

  describe('serviceToken', () => {
    it('returns a token reference', () => {
      expect(instance.serviceToken().toString()).toMatch(
        /Token\[Id\.Outputs\.LexV2CfnCrFunctionArn\.\d+\]/
      );
    });
  });

  describe('serviceLinkedRoleArn', () => {
    it('returns a token reference', () => {
      expect(instance.serviceLinkedRoleArn().toString()).toMatch(
        /Token\[Id\.Outputs\.LexServiceLinkedRole\.\d+\]/
      );
    });
  });

  describe('serviceLinkedRoleName', () => {
    it('returns a token reference', () => {
      expect(instance.serviceLinkedRoleName()).toMatch(/Token/);
    });
  });
});
