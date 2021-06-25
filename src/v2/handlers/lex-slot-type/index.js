const {
    LexModelsV2Client,
    UpdateSlotTypeCommand,
    CreateSlotTypeCommand,
    DeleteSlotTypeCommand,
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
                const createCommand = new CreateSlotTypeCommand(params);
                response = await client.send(createCommand);
                console.log(response);

                return {
                    PhysicalResourceId: response.slotTypeId
                };
            case "Delete":
                params.botVersion = params.botVersion || "DRAFT";
                params.slotTypeId = event.PhysicalResourceId;
                const deleteCommand = new DeleteSlotTypeCommand(params);
                response = await client.send(deleteCommand);
                console.log(response);

                return {
                    PhysicalResourceId: response.slotTypeId
                };
            case "Update":
                params.botVersion = params.botVersion || "DRAFT";
                params.slotTypeId = event.PhysicalResourceId;
                const updateCommand = new UpdateSlotTypeCommand(params);
                response = await client.send(updateCommand);
                console.log(response);

                return {
                    PhysicalResourceId: response.slotTypeId
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
