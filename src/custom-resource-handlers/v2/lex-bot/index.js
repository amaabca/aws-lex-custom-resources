const {
    LexModelsV2Client,
    BuildBotLocaleCommand,
    ListBotsCommand,
    BotFilterName,
    BotFilterOperator,
    CreateBotCommand
} = require("@aws-sdk/client-lex-models-v2");


exports.handler = async (event, context) => {
    try {
        console.log(event, context);
        let params = JSON.parse(event.ResourceProperties.props);

        const client = new LexModelsV2Client();
        // const client = new LexModelsV2Client({ region: 'us-east-1', profile: 'redteam-staging-sso' });


        if (event.RequestType === "Create") {
            const command = new CreateBotCommand(params);
            let createResponse = await client.send(command);
            console.log(createResponse);
            return createResponse;
        } else if (event.RequestType === "Delete") {

        } else if (event.RequestType === "Update") {

        } else {
            console.error("Event request type unknown!");
        }
    } catch (err) {
        console.error(err);
    }
}


// handler({
//     RequestType: "Create",
//     ResourceProperties: {
//         props: JSON.stringify({
//             botName: "DarkoBot",
//             dataPrivacy: {
//                 childDirected: false
//             },
//             idleSessionTTLInSeconds: 60,
//             roleArn: "arn:aws:iam::157153201295:role/aws-service-role/lexv2.amazonaws.com/AWSServiceRoleForLexV2Bots_ULAD0VPOVRP"
//         })
//     }
// }, {});
