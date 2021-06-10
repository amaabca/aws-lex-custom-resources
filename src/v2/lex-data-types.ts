import {
  InputContext,
  FulfillmentCodeHookSettings,
  DialogCodeHookSettings,
  IntentClosingSetting,
  IntentConfirmationSetting,
  KendraConfiguration,
  OutputContext,
  SampleUtterance,
  VoiceSettings,
  BotVersionLocaleDetails,
  SlotTypeValue,
  SlotValueSelectionSetting,
  SlotValueElicitationSetting,
  ConversationLogSettings,
  BotAliasLocaleSettings,
  SentimentAnalysisSettings
} from "@aws-sdk/client-lex-models-v2";
import { ObfuscationSetting } from "../lex-data-types";

export interface LexBotAttributes {
  botName?: string,
  botTags?: {
    [key: string]: string
  },
  dataPrivacy: {
    childDirected: boolean
  },
  description?: string,
  idleSessionTTLInSeconds: number,
  roleArn: string,
  testBotAliasTags?: {
    [key: string]: string
  }
}

export interface LexIntentAttributes {
  botId?: string,
  botName: string,
  botVersion?: string,
  description?: string,
  dialogCodeHook?: DialogCodeHookSettings,
  fulfillmentCodeHook?: FulfillmentCodeHookSettings
  inputContexts?: InputContext[],
  intentClosingSetting?: IntentClosingSetting,
  intentConfirmationSetting?: IntentConfirmationSetting,
  intentName: string,
  kendraConfiguration?: KendraConfiguration,
  localeId: string,
  outputContexts?: OutputContext[],
  parentIntentSignature?: string,
  sampleUtterances?: SampleUtterance[]
}

export interface LexBotLocaleAttributes {
  botId?: string,
  botName: string,
  botVersion: string,
  description?: string,
  localeId: string,
  nluIntentConfidenceThreshold: number,
  voiceSettings?: VoiceSettings
}

export interface LexBotVersionAttributes {
  botId?: string,
  botName: string,
  botVersionLocaleSpecification: { [key: string]: BotVersionLocaleDetails } | undefined,
  description?: string
}

export interface LexSlotTypeAttributes {
  botId?: string,
  botName: string,
  botVersion?: string,
  description?: string,
  localeId: string,
  parentSlotTypeSignature?: string,
  slotTypeName: string,
  slotTypeValues?: SlotTypeValue[],
  valueSelectionSetting: SlotValueSelectionSetting
}

export interface LexSlotAttributes {
  botId?: string,
  botName: string,
  botVersion?: string,
  description?: string,
  localeId: string,
  intentId?: string,
  intentName: string,
  obfuscationSetting?: ObfuscationSetting,
  slotName: string,
  slotTypeId?: string,
  slotTypeName: string,
  valueElicitationSetting: SlotValueElicitationSetting
}

export interface LexBotAliasAttributes {
  botId?: string,
  botName: string,
  botAliasName: string,
  botAliasLocaleSettings: { [key: string]: BotAliasLocaleSettings },
  botVersion?: string, 
  conversationLogSettings?: ConversationLogSettings,
  description?: string,
  sentimentAnalysisSettings?:  SentimentAnalysisSettings,
  tags?: { [key: string]: string }
}
