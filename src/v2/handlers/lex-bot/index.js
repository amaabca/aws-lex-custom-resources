import {
  LexModelsV2Client,
  CreateBotCommand,
  DeleteBotCommand,
  UpdateBotCommand
} from '@aws-sdk/client-lex-models-v2';

const handler = async (event, context) => {
  try {
    console.log(event, context);
    let params = JSON.parse(event.ResourceProperties.props);
    const client = new LexModelsV2Client({ region: process.env.REGION || "us-east-1" });

    if (event.RequestType === "Create") {
      const command = new CreateBotCommand(params);
      let createResponse = await client.send(command);
      console.log(createResponse);
      return {
        PhysicalResourceId: createResponse.botId
      };
    } else if (event.RequestType === "Delete") {
      const deleteCommand = new DeleteBotCommand({ botId: event.PhysicalResourceId });
      let deleteResponse = await client.send(deleteCommand);
      console.log(deleteResponse);
      return {
        PhysicalResourceId: deleteResponse.botId
      };
    } else if (event.RequestType === "Update") {
      params.botId = event.PhysicalResourceId;
      const updateCommand = new UpdateBotCommand(params);
      let updateResponse = await client.send(updateCommand);
      console.log(updateResponse);
      return {
        PhysicalResourceId: updateResponse.botId
      };
    } else {
      console.error("Event request type unknown!");
      throw new Error("Event request type unknown!");
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export {
  handler,
};
