import {
  LexModelsV2Client,
  DeleteBotVersionCommand,
  CreateBotVersionCommand
} from "@aws-sdk/client-lex-models-v2";

const logger = process.env.TEST ? { info: (c) => { } } : console;
const client = new LexModelsV2Client({
  region: process.env.REGION || 'us-east-1',
  logger: logger
});

const handler = async (event, context) => {
  try {
    logger.info(event);
    let params = JSON.parse(event.ResourceProperties.props);

    switch (event.RequestType) {
      case "Create": {
        const createCommand = new CreateBotVersionCommand(params);
        const response = await client.send(createCommand);
        logger.info(response);

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
        logger.info(response);

        return {
          PhysicalResourceId: response.botVersion
        };
      }
      case "Update": { // No update event for this resource
        return {
          PhysicalResourceId: event.PhysicalResourceId
        };
      }
      default:
        throw new Error(`${event.RequestType} is not supported!`);
    }
  } catch (err) {
    throw new Error(err);
  }
};

export {
  handler
}
