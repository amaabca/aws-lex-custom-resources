/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as cdk from '@aws-cdk/core';
import { LexIntent, LexIntentPriority, LexSlotType } from '..';

import {
  LexBotAttributes,
  LexIntentAttributes,
  LexIntentPriorityAttributes,
  LexSlotTypeAttributes,
} from '../lex-data-types';

export default class LexBot extends cdk.Construct {
  scope: cdk.Stack;
  id: string;
  props: LexBotAttributes;
  resource: cdk.CustomResource;
  intents: {
    [key: string]: LexIntent
  };
  slotTypes: {
    [key: string]: LexSlotType
  };

  // the service token must match the exported service token by the lex-bot stack
  constructor(scope: cdk.Stack, id: string, props: LexBotAttributes) {
    super(scope, id);

    this.scope = scope;
    this.id = id;
    this.props = props;
    this.props.description = id;
    this.props.botName = id;
    this.intents = {};
    this.slotTypes = {};

    if (this.validName()) {
      this.resource = new cdk.CustomResource(scope, `${id}-Resource`, {
        serviceToken: cdk.Fn.importValue(props.botServiceToken),
        properties: {
          props: JSON.stringify(this.props),
        },
      });
    } else {
      throw new Error('Bot names must only contain letters, numbers and non repeating underscores');
    }
  }

  addIntent(props: LexIntentAttributes): LexIntent {
    if (!this.intents[props.intentName]) {
      const intent = new LexIntent(this.scope, this.props.intentServiceToken,
        {
          ...props,
          botId: LexBot.getResourceId(this.scope, this.resource),
          botVersion: 'DRAFT',
        });
      this.intents[props.intentName] = intent;
      return intent;
    } else {
      throw new Error(`Intent with name ${props.intentName} already exists for this bot!`);
    }
  }

  addSlotType(props: LexSlotTypeAttributes): LexSlotType {
    if (!this.slotTypes[props.slotTypeName]) {
      const slotTypeResource = new cdk.CustomResource(this.scope, props.slotTypeName, {
        serviceToken: cdk.Fn.importValue(this.props.slotTypeServiceToken),
        properties: {
          props: JSON.stringify({
            ...this.props,
            botId: LexBot.getResourceId(this.scope, this.resource),
            botVersion: 'DRAFT',
          }),
        },
      });

      const slotType = new LexSlotType(props);
      slotType.Resource = slotTypeResource;
      this.slotTypes[props.slotTypeName] = slotType;
      return slotType;
    } else {
      throw new Error(`SlotType with name ${props.slotTypeName} already exists for this bot!`);
    }
  }

  // method for creating priorities for all the slots provided
  finalize(): LexIntentPriority[] {
    const priorityConstructs: LexIntentPriority[] = [];
    for (const key in this.intents) {
      const priorities: { slotId: string, priority: number }[] = [];

      for (const slotKey in this.intents[key].slots) {
        priorities.push({
          slotId: LexBot.getResourceId(this.scope, this.intents[key].slots[slotKey].Resource!),
          priority: this.intents[key].slots[slotKey].props.priority,
        });
      }

      const tempPriority: LexIntentPriorityAttributes = {
        botId: LexBot.getResourceId(this.scope, this.resource),
        intentId: LexBot.getResourceId(this.scope, this.intents[key].Resource),
        intentName: this.intents[key].Name,
        localeId: 'en_US',
        slotPriorities: priorities,
      }
      priorityConstructs.push(
        new LexIntentPriority(
          this.scope,
          `${this.intents[key].Name}-Priorities`,
          this.props.intentPriorityServiceToken,
          tempPriority
        )
      )
    }
    return priorityConstructs;
  }


  get Name(): string {
    return this.props.botName!;
  }

  get Resource(): cdk.CustomResource {
    return this.resource;
  }

  getSlotType(name: string): LexSlotType | undefined {
    return this.slotTypes[name];
  }

  getIntent(name: string): LexIntent | undefined {
    return this.intents[name];
  }

  private validName(): boolean {
    return new RegExp('^[A-Za-z0-9]+(_[A-Za-z0-9]+)*$').test(this.id);
  }

  public static getResourceId(scope: cdk.Stack, resource: cdk.CustomResource): string {
    return cdk.Fn.ref(scope.getLogicalId(resource.node.defaultChild as cdk.CfnCustomResource));
  }
}
