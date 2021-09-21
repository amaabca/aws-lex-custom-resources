import {
  LexModelsV2Client,
  DeleteBotVersionCommand,
  CreateBotVersionCommand
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
      const createCommand = new CreateBotVersionCommand(params);
      const response = await client.send(createCommand);

      return {
        PhysicalResourceId: response.botVersion
      };
    }
    case "Delete": {
      const deleteCommand = new DeleteBotVersionCommand({
        ...params,
        botVersion: event.PhysicalResourceId
      });
      const response = await client.send(deleteCommand);

      return {
        PhysicalResourceId: response.botVersion
      };
    }
    case "Update": { // we can't update a version, just do a no-op
      return {
        PhysicalResourceId: event.PhysicalResourceId
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
