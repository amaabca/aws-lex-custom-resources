import LexBot from '../../src/bot/lex-bot'
import * as cdk from '@aws-cdk/core';
import { LexIntent, LexSlot, LexSlotType } from '../../src';

describe('Lex v2 Bot class', () => {
  describe('Create a new instance of the bot class', () => {
    let sampleStack: cdk.Stack;
    let instance: LexBot;

    beforeAll(async () => {
      sampleStack = new cdk.Stack();
      instance = new LexBot(sampleStack, 'SampleBot', {
        dataPrivacy: {
          childDirected: false,
        },
        idleSessionTTLInSeconds: 80,
        roleArn: 'sampleRoleArn',
        botServiceToken: 'SampleBotServiceToken',
        intentServiceToken: 'SampleIntentServiceToken',
        slotServiceToken: 'SampleSlotServiceToken',
        slotTypeServiceToken: 'SampleSlotTypeServiceToken',
        intentPriorityServiceToken: 'SampleIntentPriorityServiceToken',
      });
    });

    it('Creates a new instance of the bot v2 class', () => {
      expect(instance).not.toBeNull();
    });

    it('Gets the correct name', () => {
      expect(instance.Name).toBe('SampleBot');
    });

    it('Gets the cfn resource properly', () => {
      expect(instance.Resource instanceof cdk.CustomResource).toBe(true);
    });

    describe('Adding a new intent to this bot', () => {
      it('has an intent named TestIntent', () => {
        expect(instance.addIntent({
          intentName: 'TestIntent',
          localeId: 'en_US',
          slotServiceToken: instance.props.slotServiceToken,
        })).not.toBe(undefined);
      });

      describe('Add a slottype to the bot', () => {
        beforeAll(() => {
          instance.addSlotType({
            localeId: 'en_US',
            slotTypeName: 'SampleSlotType',
            valueSelectionSetting: {
              resolutionStrategy: 'TOP_RESOLUTION',
            },
          });
        });

        it('has a slottype with the correct name', () => {
          expect(instance.getSlotType('SampleSlotType')).not.toBeNull();
        });

        describe('Add a slot using the existing intent and slottype', () => {
          let intent: LexIntent;
          let slotType: LexSlotType;

          beforeAll(() => {
            intent = instance.getIntent('TestIntent') as LexIntent;
            slotType = instance.getSlotType('SampleSlotType') as LexSlotType;

            intent.addSlot({
              slotName: 'SampleSlot',
              localeId: 'en_US',
              valueElicitationSetting: {
                slotConstraint: 'Required',
                promptSpecification: {
                  maxRetries: 1,
                  messageGroups: [
                    {
                      message: {
                        plainTextMessage: {
                          value: 'Hello',
                        },
                      },
                    },
                  ],
                },
              },
              priority: 1,
            }, slotType);
          });

          it('has the slot inside of the intent', () => {
            const sampleSlot: LexSlot = intent.getSlot('SampleSlot') as LexSlot;
            expect(sampleSlot).not.toBe(undefined);
          });

          describe('Add another slot with same name', () => {
            it('Throws an error when adding', () => {
              expect(() => {
                intent.addSlot({
                  slotName: 'SampleSlot',
                  localeId: 'en_US',
                  valueElicitationSetting: {
                    slotConstraint: 'Required',
                    promptSpecification: {
                      maxRetries: 1,
                      messageGroups: [
                        {
                          message: {
                            plainTextMessage: {
                              value: 'Hello',
                            },
                          },
                        },
                      ],
                    },
                  },
                  priority: 1,
                }, slotType)
              }).toThrow();
            });
          });

          describe('Add another intent with same name', () => {
            it('Throws an error when adding', () => {
              expect(() => {
                instance.addIntent({
                  intentName: 'TestIntent',
                  localeId: 'en_US',
                  slotServiceToken: instance.props.slotServiceToken,
                })
              }).toThrow();
            });
          });

          describe('Add another slot type with same name', () => {
            it('Throws an error when adding', () => {
              expect(() => {
                instance.addSlotType({
                  localeId: 'en_US',
                  slotTypeName: 'SampleSlotType',
                  valueSelectionSetting: {
                    resolutionStrategy: 'TOP_RESOLUTION',
                  },
                })
              }).toThrow();
            });
          });


          describe('Add more test slots then finalize the bot', () => {
            beforeAll(() => {
              intent = instance.getIntent('TestIntent') as LexIntent;
              intent.addSlot({
                slotName: 'SampleNumberSlot',
                localeId: 'en_US',
                valueElicitationSetting: {
                  slotConstraint: 'Required',
                  promptSpecification: {
                    maxRetries: 1,
                    messageGroups: [
                      {
                        message: {
                          plainTextMessage: {
                            value: 'What is the number?',
                          },
                        },
                      },
                    ],
                  },
                },
                priority: 1,
              }, 'AMAZON.Number');
            });

            it('Loops over and creates priorities when finalized', () => {
              expect(instance.finalize().length).toBe(1);
            });
          });
        });
      });
    });
  });

  describe('Lex v2 bot class with incorrect name', () => {
    it('Expect it to throw an error', () => {
      const sampleStack = new cdk.Stack();

      expect(() => {
        new LexBot(sampleStack, 'SampleBot-123!*', {
          dataPrivacy: {
            childDirected: false,
          },
          idleSessionTTLInSeconds: 80,
          roleArn: 'sampleRoleArn',
          botServiceToken: 'SampleBotServiceToken',
          intentServiceToken: 'SampleIntentServiceToken',
          slotServiceToken: 'SampleSlotServiceToken',
          slotTypeServiceToken: 'SampleSlotTypeServiceToken',
          intentPriorityServiceToken: 'SampleIntentPriorityServiceToken',
        });
      }).toThrow();
    });
  });
});
