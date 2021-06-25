const {
  LexModelsV2Client,
  DeleteBotVersionCommand,
  CreateBotVersionCommand
} = require("@aws-sdk/client-lex-models-v2");

const handler = async (event, context) => {
  try {
    console.log(event, context);
    let params = JSON.parse(event.ResourceProperties.props);
    const client = new LexModelsV2Client({ region: process.env.REGION || "us-east-1" });

    let response = {};

    switch (event.RequestType) {
      case "Create":
        const createCommand = new CreateBotVersionCommand(params);
        response = await client.send(createCommand);
        console.log(response);

        return {
          PhysicalResourceId: response.botVersion
        };
      case "Delete":
        params.botVersion = event.PhysicalResourceId;
        const deleteCommand = new DeleteBotVersionCommand(params);
        response = await client.send(deleteCommand);
        console.log(response);

        return {
          PhysicalResourceId: response.botVersion
        };
      case "Update": // No update event for this resource
        return {
          PhysicalResourceId: event.PhysicalResourceId
        };
      default:
        console.error(`${event.RequestType} is not supported!`);
        throw new Error(`${event.RequestType} is not supported!`);
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};


exports.handler = handler;
