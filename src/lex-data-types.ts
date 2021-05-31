enum MessageContentType {
  PLAIN_TEXT = "PlainText",
  SSML = "SSML",
  CUSTOM_PAYLOAD = "CustomPayload"
}

interface DialogCodeHook {
  messageVersion: string,
  uri: string
}

interface KendraConfig {
  kendraIndex: string,
  role: string,
  queryFilterString?: string
}

interface LexIntentAttributes {
  name?: string,
  checksum?: string,
  conclusionStatement?: LexPrompt,
  confirmationPrompt?: LexPrompt,
  createVersion?: boolean,
  description?: string,
  dialogCodeHook?: DialogCodeHook,
  followUpPrompt?: {
    prompt: LexPrompt,
    rejectionStatement: LexPrompt
  },
  fulfillmentActivity?: FulfillmentActivity,
  inputContexts?: { name: string }[],
  kendraConfiguration?: KendraConfig,
  outputContexts?: { name: string, timeToLiveInSeconds: number, turnsToLive: number }[],
  parentIntentSignature?: string,
  rejectionStatement?: LexPrompt,
  sampleUtterances?: string[],
  slots: LexSlot[]
}

interface LexIntentCDK {
  intentName: string,
  intentVersion: string,
}

enum SlotConstraint {
  REQUIRED = "Required",
  OPTIONAL = "Optional"
}

enum ObfuscationSetting {
  NONE = "NONE",
  DEFAULT = "DEFAULT_OBFUSCATION"
}

interface LexSlot {
  name: string,
  description?: string,
  defaultValueSpec?: {
    defaultValueList: { defaultValue: string }[]
  },
  obfuscationSetting?: ObfuscationSetting,
  priority?: number,
  responseCard?: string,
  sampleUtterances?: string[],
  slotConstraint: SlotConstraint,
  slotType: string,
  slotTypeVersion?: string,
  valueElicitationPrompt?: LexPrompt
}

interface LexSlotTypeEnumerationValue {
  value: string,
  synonyms?: string[]
}

interface SlotTypeConfiguration {
  regexConfiguration: {
    pattern: string
  }
}

interface LexSlotTypeAttributes {
  name?: string,
  description?: string,
  checksum?: string,
  createVersion?: boolean,
  enumerationValues: LexSlotTypeEnumerationValue[],
  parentSlotTypeSignature?: string,
  slotTypeConfigurations?: SlotTypeConfiguration[],
  valueSelectionStrategy?: ValueSelectionStrategy
}

enum ValueSelectionStrategy {
  ORIGINAL = "ORIGINAL_VALUE",
  TOP_RESOLUTION = "TOP_RESOLUTION"
}

enum FulfillmentActivityType {
  RETURN_INTENT = "ReturnIntent",
  CODE_HOOK = "CodeHook"
}

interface FulfillmentActivity {
  type: FulfillmentActivityType,
  codeHook?: DialogCodeHook
}

enum LexMessageResponseCard {
  CLARIFICATION = 'ClarificationPrompt_ResponseCard',
  ABORT_STATEMENT = 'AbortStatement_ResponseCard'
}

enum LexVoice {
  MATTHEW = 'Matthew',
  IVY = 'Ivy',
  JOANNA = 'Joanna',
  KENDRA = 'Kendra',
  KIMBERLY = 'Kimberly',
  SALLI = 'Salli',
  JOEY = 'Joey',
  JUSTIN = 'Justin',
  KEVIN = 'Kevin'
}

interface LexMessage {
  contentType: MessageContentType,
  content: string,
  groupNumber?: number
}

interface LexPrompt {
  messages: LexMessage[],
  responseCard?: string,
  maxAttempts?: number
}

interface LexBotAttributes {
  serviceToken?: string,
  name?: string,
  enableModelImprovements?: boolean,
  intents: LexIntentCDK[],
  clarificationPrompt: LexPrompt,
  abortStatement: LexPrompt,
  idleSessionTTLInSeconds: number,
  voiceId?: LexVoice,
  childDirected: boolean,
  createVersion?: boolean,
  locale: string,
  detectSentiment?: boolean,
  nluIntentConfidenceThreshold?: number
}


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
};
