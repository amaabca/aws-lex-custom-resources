import {
  LexModelsV2Client,
  CreateSlotCommand,
  DeleteSlotCommand,
  UpdateSlotCommand
} from '@aws-sdk/client-lex-models-v2';

const logger = process.env.TEST ? { info: (c) => { } } : console;
const client = new LexModelsV2Client({
  region: process.env.REGION || 'us-east-1',
  logger,
  maxAttempts: 10,
  retryMode: 'adaptive',
});

const handler = async (event, context) => {
  logger.info(JSON.stringify(event));
  let params = JSON.parse(event.ResourceProperties.props);

  switch (event.RequestType) {
    case 'Create': {
      const createCommand = new CreateSlotCommand({
        ...params,
        botVersion: params.botVersion || 'DRAFT'
      });
      const response = await client.send(createCommand);

      return {
        PhysicalResourceId: response.slotId
      };
    }
    case 'Delete': {
      const deleteCommand = new DeleteSlotCommand({
        ...params,
        slotId: event.PhysicalResourceId,
        botVersion: params.botVersion || 'DRAFT'
      });
      const response = await client.send(deleteCommand);

      return {
        PhysicalResourceId: event.PhysicalResourceId
      };
    }
    case 'Update': {
      const updateCommand = new UpdateSlotCommand({
        ...params,
        slotId: event.PhysicalResourceId,
        botVersion: params.botVersion || 'DRAFT'
      });
      const response = await client.send(updateCommand);

      return {
        PhysicalResourceId: response.slotId
      };
    }
    default: {
      throw new Error(`${event.RequestType} is not supported!`);
    }
  }
};

export {
  handler,
};
