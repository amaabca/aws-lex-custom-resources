import {
  LexModelsV2Client,
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
  try {
    logger.info(JSON.stringify(event));
    let params = JSON.parse(event.ResourceProperties.props);

    const describeCommand = new DescribeIntentCommand({
      botId: params.botId,
      botVersion: params.botVersion || "DRAFT",
      intentId: params.intentId,
      localeId: params.localeId
    });

    const describeResults = await client.send(describeCommand);

    if (event.RequestType === "Create" || event.RequestType === "Update") {
      const updateCommand = new UpdateIntentCommand({
        ...describeResults,
        slotPriorities: params.slotPriorities
      });
      const response = await client.send(updateCommand);
      logger.info(response);

      return {
        PhysicalResourceId: `${response.intentId}-priority`
      };
    } else {
      return {};
    }
  } catch (err) {
    throw new Error(err);
  }
};

export {
  handler
};
