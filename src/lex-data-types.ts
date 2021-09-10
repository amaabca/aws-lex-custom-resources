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
  SentimentAnalysisSettings,
  SlotPriority,
} from '@aws-sdk/client-lex-models-v2';

export enum ObfuscationSetting {
  NONE = 'NONE',
  DEFAULT = 'DEFAULT_OBFUSCATION'
}

export enum SlotTypeType {
  CUSTOM,
  BUILT_IN
}


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
  },
  botServiceToken: string,
  intentServiceToken: string,
  slotServiceToken: string,
  slotTypeServiceToken: string,
  intentPriorityServiceToken: string
}

export interface LexIntentAttributes {
  botId?: string,
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
  slotServiceToken: string,
}

export interface LexBotLocaleAttributes {
  botId: string,
  botVersion: string,
  description?: string,
  localeId: string,
  nluIntentConfidenceThreshold: number,
  voiceSettings?: VoiceSettings
}

export interface LexBotVersionAttributes {
  botId: string,
  botVersionLocaleSpecification: { [key: string]: BotVersionLocaleDetails } | undefined,
  description?: string
}

export interface LexSlotTypeAttributes {
  description?: string,
  localeId: string,
  parentSlotTypeSignature?: string,
  slotTypeName: string,
  slotTypeValues?: SlotTypeValue[],
  valueSelectionSetting: SlotValueSelectionSetting
}

export interface LexSlotAttributes {
  intentId?: string,
  botId?: string,
  description?: string,
  localeId: string,
  obfuscationSetting?: ObfuscationSetting,
  slotName: string,
  valueElicitationSetting: SlotValueElicitationSetting,
  priority: number
}

export interface LexIntentPriorityAttributes {
  botId: string,
  botVersion?: string,
  intentId: string,
  intentName: string,
  localeId: string,
  slotPriorities: SlotPriority[]
}

export interface LexBotAliasAttributes {
  botId: string,
  botAliasName: string,
  botAliasLocaleSettings: { [key: string]: BotAliasLocaleSettings },
  botVersion?: string,
  conversationLogSettings?: ConversationLogSettings,
  description?: string,
  sentimentAnalysisSettings?: SentimentAnalysisSettings,
  tags?: { [key: string]: string }
}
