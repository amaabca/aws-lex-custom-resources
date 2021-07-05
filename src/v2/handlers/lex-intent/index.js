const {
  LexModelsV2Client,
  CreateIntentCommand,
  DeleteIntentCommand,
  UpdateIntentCommand
} = require("@aws-sdk/client-lex-models-v2");

const handler = async (event, context) => {
  try {
    console.log(event, context);
    let params = JSON.parse(event.ResourceProperties.props);
    const client = new LexModelsV2Client({ region: process.env.REGION || "us-east-1" });

    let response = {};

    switch (event.RequestType) {
      case "Create":
        params.botVersion = params.botVersion || "DRAFT";
        const createCommand = new CreateIntentCommand(params);
        response = await client.send(createCommand);
        console.log(response);
        return {
          PhysicalResourceId: response.intentId
        };
      case "Delete":
        params.botVersion = params.botVersion || "DRAFT";
        params.intentId = event.PhysicalResourceId;
        const deleteCommand = new DeleteIntentCommand(params);
        response = await client.send(deleteCommand);
        console.log(response);
        return {
          PhysicalResourceId: event.PhysicalResourceId // delete doesnt return the id anymore so we will just return the id we had originally here
        };
      case "Update":
        params.botVersion = params.botVersion || "DRAFT";
        params.intentId = event.PhysicalResourceId;
        const updateCommand = new UpdateIntentCommand(params);
        response = await client.send(updateCommand);
        console.log(response);
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
