import * as cdk from '@aws-cdk/core';
import { LexSlot, LexSlotType } from '..';
import { LexIntentAttributes, LexSlotAttributes } from '../lex-data-types';

export default class LexIntent extends cdk.Construct {
  props: LexIntentAttributes;
  resource: cdk.CustomResource;
  scope: cdk.Stack;
  slots: {
    [key: string]: LexSlot
  }

  constructor(scope: cdk.Stack, serviceToken: string, props: LexIntentAttributes) {
    super(scope, props.intentName);
    this.scope = scope;
    this.props = props;
    this.slots = {};

    this.resource = new cdk.CustomResource(scope, `${props.intentName}-Resource`, {
      serviceToken: cdk.Fn.importValue(serviceToken),
      properties: {
        props: JSON.stringify(this.props),
      },
    });
  }

  get Resource(): cdk.CustomResource {
    return this.resource;
  }

  get Name(): string {
    return this.props.intentName;
  }

  addSlot(props: LexSlotAttributes, slotType: LexSlotType | string): LexSlot {
    if (!this.slots[props.slotName]) {
      const slotResource = new cdk.CustomResource(this.scope, props.slotName, {
        serviceToken: cdk.Fn.importValue(this.props.slotServiceToken),
        properties: {
          props: JSON.stringify({
            ...this.props,
            botVersion: 'DRAFT',
            intentId: this.getResourceId(this.Resource),
            slotTypeId: typeof slotType === 'string' ? slotType : this.getResourceId(slotType.Resource as cdk.CustomResource), // handles for built in aws types
          }),
        },
      });

      const slot = new LexSlot(props);
      slot.Resource = slotResource;
      this.slots[props.slotName] = slot;
      return slot;
    } else {
      throw new Error(`Slot with name ${props.slotName} already exists for this intent!`);
    }
  }

  getSlot(name: string): LexSlot | undefined {
    return this.slots[name];
  }

  private getResourceId(resource: cdk.CustomResource): string {
    return cdk.Fn.ref(this.scope.getLogicalId(resource.node.defaultChild as cdk.CfnCustomResource));
  }
}
