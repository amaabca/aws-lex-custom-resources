const {
  LexModelsV2Client,
  UpdateIntentCommand
} = require("@aws-sdk/client-lex-models-v2");

const handler = async (event, context) => {
  try {
    console.log(event, context);
    let params = JSON.parse(event.ResourceProperties.props);
    const client = new LexModelsV2Client({ region: process.env.REGION || "us-east-1" });

    let response = {};

    if (event.RequestType === "Create" || event.RequestType === "Update") {
      params.botVersion = params.botVersion || "DRAFT";
      const updateCommand = new UpdateIntentCommand(params);
      response = await client.send(updateCommand);
      console.log(response);

    } else {
      return {};
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

exports.handler = handler;
