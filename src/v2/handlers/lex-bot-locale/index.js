const {
  LexModelsV2Client,
  DeleteBotLocaleCommand,
  UpdateBotLocaleCommand,
  CreateBotLocaleCommand
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
        delete params.botName;
        const createCommand = new CreateBotLocaleCommand(params);
        response = await client.send(createCommand);
        console.log(response);

        return {
          PhysicalResourceId: response.localeId
        };
      case "Delete":
        params.botVersion = params.botVersion || "DRAFT";
        params.localeId = event.PhysicalResourceId;
        const deleteCommand = new DeleteBotLocaleCommand(params);
        response = await client.send(deleteCommand);
        console.log(response);

        return {
          PhysicalResourceId: response.localeId
        };
      case "Update": // to be adjusted
        params.localeId = event.PhysicalResourceId;
        const updateCommand = new UpdateBotLocaleCommand(params);
        response = await client.send(updateCommand);
        console.log(response);

        return {
          PhysicalResourceId: response.localeId
        };

        default:
          throw new Error(`${event.RequestType} is not supported!`);
      }
    } catch (err) {
      throw err;
    }
};

exports.handler = handler;
