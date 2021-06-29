const {
    LexModelsV2Client,
    DeleteBotAliasCommand,
    UpdateBotAliasCommand,
    CreateBotAliasCommand
} = require("@aws-sdk/client-lex-models-v2");

const handler = async (event, context) => {
    try {
        console.log(event, context);
        let params = JSON.parse(event.ResourceProperties.props);
        const client = new LexModelsV2Client({ region: process.env.REGION || "us-east-1" });

        let response = {};

        switch (event.RequestType) {
            case "Create":
                params.botVersion = params.botVersion || 'DRAFT';
                const createCommand = new CreateBotAliasCommand(params);
                response = await client.send(createCommand);
                console.log(response);

                return {
                    PhysicalResourceId: response.botAliasId
                };
            case "Delete":
                params.botAliasId = event.PhysicalResourceId;
                const deleteCommand = new DeleteBotAliasCommand(params);
                response = await client.send(deleteCommand);
                console.log(response);

                return {
                    PhysicalResourceId: response.botAliasId
                };
            case "Update":
                params.botAliasId = event.PhysicalResourceId;
                const updateCommand = new UpdateBotAliasCommand(params);
                response = await client.send(updateCommand);
                console.log(response);

                return {
                    PhysicalResourceId: response.botAliasId
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