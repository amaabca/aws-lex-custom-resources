import { Reference } from 'aws-cdk-lib';
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
  SlotTypeValue,
  SlotValueSelectionSetting,
  SlotValueElicitationSetting,
  ConversationLogSettings,
  BotAliasLocaleSettings,
  SentimentAnalysisSettings,
  PostFulfillmentStatusSpecification,
} from '@aws-sdk/client-lex-models-v2';

export enum ObfuscationSetting {
  NONE = 'NONE',
  DEFAULT = 'DEFAULT_OBFUSCATION',
}

export enum SlotTypeType {
  CUSTOM,
  BUILT_IN,
}

export interface LexBotAttributes {
  botName?: string;
  botTags?: {
    [key: string]: string;
  };
  dataPrivacy: {
    childDirected: boolean;
  };
  description?: string;
  idleSessionTTLInSeconds: number;
  roleArn: string | Reference;
  testBotAliasTags?: {
    [key: string]: string;
  };
  'CR.botLocales'?: LexBotLocaleAttributes[];
}

export interface LexIntentAttributes {
  botId?: string;
  botVersion?: string;
  description?: string;
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  inputContexts?: InputContext[];
  intentClosingSetting?: IntentClosingSetting;
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentName: string;
  kendraConfiguration?: KendraConfiguration;
  outputContexts?: OutputContext[];
  parentIntentSignature?: string;
  postFulfillmentStatusSpecification?: PostFulfillmentStatusSpecification;
  sampleUtterances?: SampleUtterance[];
  'CR.slots'?: LexSlotAttributes[];
}

export interface LexBotLocaleAttributes {
  botId?: string | Reference;
  botVersion?: string;
  description?: string;
  localeId: string;
  nluIntentConfidenceThreshold: number;
  voiceSettings?: VoiceSettings;
  'CR.slotTypes'?: LexSlotTypeAttributes[];
  'CR.intents'?: LexIntentAttributes[];
}

export interface LexBotVersionAttributes {
  botId: string | Reference;
  description?: string;
  'CR.botLocaleIds'?: string | Reference;
  'CR.lastUpdatedDateTime'?: string | Reference;
}

export interface LexSlotTypeAttributes {
  description?: string | Reference;
  localeId?: string;
  parentSlotTypeSignature?: string;
  slotTypeName: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting: SlotValueSelectionSetting;
}

export interface LexSlotAttributes {
  intentId?: string;
  botId?: string;
  description?: string;
  obfuscationSetting?: ObfuscationSetting;
  slotName: string;
  slotTypeName?: string;
  valueElicitationSetting: SlotValueElicitationSetting;
  'CR.slotTypeName'?: string;
}

export interface LexBotAliasAttributes {
  botId?: string | Reference;
  botAliasName: string;
  botAliasLocaleSettings: { [key: string]: BotAliasLocaleSettings };
  botVersion?: string | Reference;
  conversationLogSettings?: ConversationLogSettings;
  description?: string;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  tags?: { [key: string]: string };
}
