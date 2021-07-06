import {
  LexModelsV2Client,
  UpdateIntentCommand
} from "@aws-sdk/client-lex-models-v2";
const logger = process.env.TEST ? { info: (c) => { } } : console;
const client = new LexModelsV2Client({
  region: process.env.REGION || "us-east-1",
  logger
});


const handler = async (event, context) => {
  try {
    logger.info(JSON.stringify(event));
    let params = JSON.parse(event.ResourceProperties.props);

    if (event.RequestType === "Create" || event.RequestType === "Update") {
      const updateCommand = new UpdateIntentCommand({
        ...params,
        botVersion: params.botVersion || "DRAFT"
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
