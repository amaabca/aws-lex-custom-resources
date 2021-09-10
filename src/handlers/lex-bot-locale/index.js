import {
  LexModelsV2Client,
  DeleteBotLocaleCommand,
  UpdateBotLocaleCommand,
  CreateBotLocaleCommand
} from '@aws-sdk/client-lex-models-v2';

const logger = process.env.TEST ? { info: (c) => { } } : console;
const client = new LexModelsV2Client({
  region: process.env.REGION || 'us-east-1',
  logger,
  maxAttempts: 10,
  retryMode: 'adaptive',
});

const handler = async (event, context) => {
  logger.info(JSON.stringify(event));
  let params = JSON.parse(event.ResourceProperties.props);

  switch (event.RequestType) {
    case "Create": {
      const createCommand = new CreateBotLocaleCommand({
        ...params,
        botVersion: params.botVersion || "DRAFT"
      });
      const response = await client.send(createCommand);

      return {
        PhysicalResourceId: response.localeId
      };
    }
    case "Delete": {
      const deleteCommand = new DeleteBotLocaleCommand({
        ...params,
        botVersion: params.botVersion || "DRAFT",
        localeId: event.PhysicalResourceId
      });
      const response = await client.send(deleteCommand);

      return {
        PhysicalResourceId: response.localeId
      };
    }
    case "Update": {
      const updateCommand = new UpdateBotLocaleCommand({
        ...params,
        localeId: event.PhysicalResourceId
      });
      const response = await client.send(updateCommand);

      return {
        PhysicalResourceId: response.localeId
      };
    }
    default: {
      throw new Error(`${event.RequestType} is not supported!`);
    }
  }
};

export {
  handler,
};