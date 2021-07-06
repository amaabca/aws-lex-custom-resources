import {
  LexModelsV2Client,
  CreateIntentCommand,
  DeleteIntentCommand,
  UpdateIntentCommand
} from "@aws-sdk/client-lex-models-v2";
const logger = process.env.TEST ? { info: (c) => { } } : console;
const client = new LexModelsV2Client({
  region: process.env.REGION || "us-east-1",
  logger
});


const handler = async (event, context) => {
  try {
    logger.info(event);
    const params = JSON.parse(event.ResourceProperties.props);
    let response = {};

    switch (event.RequestType) {
      case "Create":
        const createCommand = new CreateIntentCommand({
          ...params,
          botVersion: params.botVersion || "DRAFT"
        });
        response = await client.send(createCommand);
        logger.info(response);

        return {
          PhysicalResourceId: response.intentId
        };
      case "Delete":
        const deleteCommand = new DeleteIntentCommand({
          ...params,
          botVersion: params.botVersion || "DRAFT",
          intentId: event.PhysicalResourceId
        });
        response = await client.send(deleteCommand);
        logger.info(response);

        return {
          PhysicalResourceId: event.PhysicalResourceId // delete doesnt return the id anymore so we will just return the id we had originally here
        };
      case "Update":
        const updateCommand = new UpdateIntentCommand({
          ...params,
          botVersion: params.botVersion || "DRAFT",
          intentId: event.PhysicalResourceId
        });
        response = await client.send(updateCommand);
        logger.info(response);

        return {
          PhysicalResourceId: response.intentId
        };
      default:
        throw new Error(`Event request type unknown!`);
    }
  } catch (err) {
    throw err;
  }
};

exports.handler = handler;
