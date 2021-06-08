import { MessageGroup, InputContext, FulfillmentCodeHookSettings, DialogCodeHookSettings, IntentClosingSetting, IntentConfirmationSetting, KendraConfiguration, OutputContext, SampleUtterance } from "@aws-sdk/client-lex-models-v2";


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

export {
  LexBotAttributes,
  LexIntentAttributes
}
