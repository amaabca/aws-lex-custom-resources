import LexBot from '../../../src/v2/bot/lex-bot';
import * as cdk from '@aws-cdk/core';

describe('Lex v2 Bot class', () => {
  describe('Create a new instance of the bot class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexBot;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexBot(sampleStack, 'SampleBot', 'sampleServiceToken', {
        dataPrivacy: {
          childDirected: false
        },
        idleSessionTTLInSeconds: 80,
        roleArn: 'sampleRoleArn'
      });
    });

    it('Creates a new instance of the bot v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Has a valid name for the bot', () => {
      expect(instance.validName()).toBe(true);
    });

    it('Gets the correct name', () => {
      expect(instance.getName()).toBe("SampleBot");
    });

    it('Gets the cfn resource properly', () => {
      expect(instance.getResource() instanceof cdk.CustomResource).toBe(true);
    });
  });

  describe('Lex v2 bot class with incorrect name', () => {
    it('Expect it to throw an error', () => {
      let sampleStack = new cdk.Stack();

      expect(() => {
        new LexBot(sampleStack, 'SampleBot-123!*', 'sampleServiceToken', {
          dataPrivacy: {
            childDirected: false
          },
          idleSessionTTLInSeconds: 80,
          roleArn: 'sampleRoleArn'
        })
      }).toThrow();
    })
  })
});
