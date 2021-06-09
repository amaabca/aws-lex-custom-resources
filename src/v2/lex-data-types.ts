import { MessageGroup, InputContext, FulfillmentCodeHookSettings, DialogCodeHookSettings, IntentClosingSetting, IntentConfirmationSetting, KendraConfiguration, OutputContext, SampleUtterance, VoiceSettings, BotVersionLocaleDetails } from "@aws-sdk/client-lex-models-v2";


interface LexBotAttributes {
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

interface LexIntentAttributes {
  botId?: string,
  botName: string,
  botVersion: string,
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

interface LexBotLocaleAttributes {
  botId?: string,
  botName: string,
  botVersion: string,
  description?: string,
  localeId: string,
  nluIntentConfidenceThreshold: number,
  voiceSettings?: VoiceSettings
}

interface LexBotVersionAttributes {
  botId?: string,
  botName: string,
  botVersionLocaleSpecification: { [key: string]: BotVersionLocaleDetails } | undefined,
  description?: string
}

export {
  LexBotAttributes,
  LexIntentAttributes,
  LexBotLocaleAttributes,
  LexBotVersionAttributes
}
