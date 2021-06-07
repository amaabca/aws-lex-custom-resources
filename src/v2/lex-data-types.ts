

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

export {
  LexBotAttributes
}
