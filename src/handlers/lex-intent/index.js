import {
  LexModelsV2Client,
  CreateIntentCommand,
  DeleteIntentCommand,
  UpdateIntentCommand,
  DescribeIntentCommand
} from "@aws-sdk/client-lex-models-v2";
const logger = process.env.TEST ? { info: (c) => { } } : console;
const client = new LexModelsV2Client({
  region: process.env.REGION || "us-east-1",
  logger,
  maxAttempts: 10,
  retryMode: 'adaptive',
});


const handler = async (event, context) => {
  logger.info(event);
  const params = JSON.parse(event.ResourceProperties.props);

  switch (event.RequestType) {
    case "Create": {
      const createCommand = new CreateIntentCommand({
        ...params,
        botVersion: params.botVersion || "DRAFT"
      });
      const response = await client.send(createCommand);
      logger.info(response);

      return {
        PhysicalResourceId: response.intentId
      };
    }
    case "Delete": {
      const deleteCommand = new DeleteIntentCommand({
        ...params,
        botVersion: params.botVersion || "DRAFT",
        intentId: event.PhysicalResourceId
      });
      const response = await client.send(deleteCommand);
      logger.info(response);

      return {
        PhysicalResourceId: event.PhysicalResourceId // delete doesnt return the id anymore so we will just return the id we had originally here
      };
    }
    case "Update": {
      const describeCommand = new DescribeIntentCommand({
        botId: params.botId,
        botVersion: params.botVersion || "DRAFT",
        intentId: event.PhysicalResourceId,
        localeId: params.localeId
      });

      const describeResults = await client.send(describeCommand);
      const updateCommand = new UpdateIntentCommand({
        ...describeResults,
        ...params,
        botVersion: params.botVersion || "DRAFT",
        intentId: event.PhysicalResourceId
      });
      const response = await client.send(updateCommand);
      logger.info(response);

      return {
        PhysicalResourceId: response.intentId
      };
    }
    default: {
      throw new Error(`${event.RequestType} is not supported!`);
    }
  }
};

export {
  handler
};
