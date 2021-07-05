import {
  LexModelsV2Client,
  CreateBotCommand,
  DeleteBotCommand,
  UpdateBotCommand
} from '@aws-sdk/client-lex-models-v2';

const logger = process.env.TEST ? { info: (c) => {} } : console;
const client = new LexModelsV2Client({
  region: process.env.REGION || 'us-east-1',
  logger: logger
});

const handler = async (event, context) => {
  logger.info(JSON.stringify(event));
  let params = JSON.parse(event.ResourceProperties.props);

  switch (event.RequestType) {
    case 'Create': {
      const command = new CreateBotCommand(params);
      const response = await client.send(command);

      return {
        PhysicalResourceId: response.botId
      };
    }
    case 'Delete': {
      const deleteCommand = new DeleteBotCommand({
        botId: event.PhysicalResourceId
      });
      const response = await client.send(deleteCommand);

      return {
        PhysicalResourceId: response.botId
      };
    }
    case 'Update': {
      const updateCommand = new UpdateBotCommand({
        ...params,
        botId: event.PhysicalResourceId
      });
      const response = await client.send(updateCommand);

      return {
        PhysicalResourceId: response.botId
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
