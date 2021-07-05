import {
    LexModelsV2Client,
    DeleteBotAliasCommand,
    UpdateBotAliasCommand,
    CreateBotAliasCommand,
} from '@aws-sdk/client-lex-models-v2';

const logger = process.env.TEST ? { info: (c) => {} } : console;
const client = new LexModelsV2Client({
  region: process.env.REGION || 'us-east-1',
  logger: logger
});

const handler = async (event, context) => {
  let params = JSON.parse(event.ResourceProperties.props);

  switch (event.RequestType) {
    case "Create": {
      const createCommand = new CreateBotAliasCommand({
        ...params,
        botVersion: params.botVersion || 'DRAFT',
      });
      const response = await client.send(createCommand);

      return {
        PhysicalResourceId: response.botAliasId
      };
    }
    case "Delete": {
      const deleteCommand = new DeleteBotAliasCommand({
        ...params,
        botAliasId: event.PhysicalResourceId,
      });
      const response = await client.send(deleteCommand);

      return {
          PhysicalResourceId: response.botAliasId
      };
    }
    case "Update": {
      const updateCommand = new UpdateBotAliasCommand({
        ...params,
        botAliasId: event.PhysicalResourceId,
      });
      const response = await client.send(updateCommand);

      return {
          PhysicalResourceId: response.botAliasId
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
