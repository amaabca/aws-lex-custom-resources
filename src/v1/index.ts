import * as v1LexBotHandler from './handlers/lex-bot';
import * as v1LexIntentHandler from './handlers/lex-intent';
import * as v1LexSlotTypeHandler from './handlers/lex-slot-type';

const v1Handlers = {
  v1LexBotHandler: v1LexBotHandler.handler,
  v1LexIntentHandler: v1LexIntentHandler.handler,
  v1LexSlotTypeHandler: v1LexSlotTypeHandler.handler
}

import LexBot from './bot/lex-bot';
import LexSlotType from './slot-type/lex-slot-type';
import LexIntent from './intent/lex-intent';

import {
  LexIntentAttributes,
  LexMessageResponseCard,
  LexIntentCDK,
  LexVoice,
  LexMessage,
  LexPrompt,
  LexBotAttributes,
  LexSlotTypeAttributes,
  ValueSelectionStrategy,
  MessageContentType,
  FulfillmentActivityType,
  SlotConstraint,
  FulfillmentActivity,
  SlotTypeConfiguration,
  LexSlotTypeEnumerationValue,
  LexSlot,
  ObfuscationSetting,
  KendraConfig,
  DialogCodeHook,
} from './lex-data-types';

export {
  LexIntentAttributes,
  LexMessageResponseCard,
  LexIntentCDK,
  LexVoice,
  LexMessage,
  LexPrompt,
  LexBotAttributes,
  LexSlotTypeAttributes,
  ValueSelectionStrategy,
  MessageContentType,
  FulfillmentActivityType,
  SlotConstraint,
  FulfillmentActivity,
  SlotTypeConfiguration,
  LexSlotTypeEnumerationValue,
  LexSlot,
  ObfuscationSetting,
  KendraConfig,
  DialogCodeHook,
  LexBot,
  LexSlotType,
  LexIntent,
  v1Handlers as handlers
};
