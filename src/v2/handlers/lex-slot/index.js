const {
  LexModelsV2Client,
  CreateSlotCommand,
  DeleteSlotCommand,
  UpdateSlotCommand
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
        const createCommand = new CreateSlotCommand(params);
        response = await client.send(createCommand);
        console.log(response);

        return {
          PhysicalResourceId: response.slotId
        };
      case "Delete":
        params.botVersion = params.botVersion || "DRAFT";
        params.slotId = event.PhysicalResourceId;
        const deleteCommand = new DeleteSlotCommand(params);
        response = await client.send(deleteCommand);
        console.log(response);

        return {
          PhysicalResourceId: response.slotId
        };
      case "Update":
        params.botVersion = params.botVersion || "DRAFT";
        params.slotId = event.PhysicalResourceId;
        const updateCommand = new UpdateSlotCommand(params);
        response = await client.send(updateCommand);
        console.log(response);

        return {
          PhysicalResourceId: response.slotId
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
