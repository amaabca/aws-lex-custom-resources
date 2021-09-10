import {
  LexModelsV2Client,
  UpdateSlotTypeCommand,
  CreateSlotTypeCommand,
  DeleteSlotTypeCommand,
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
      const createCommand = new CreateSlotTypeCommand({
        ...params,
        botVersion: params.botVersion || 'DRAFT'
      });
      const response = await client.send(createCommand);

      return {
        PhysicalResourceId: response.slotTypeId
      };
    }
    case 'Delete': {
      const deleteCommand = new DeleteSlotTypeCommand({
        ...params,
        botVersion: params.botVersion || 'DRAFT',
        slotTypeId: event.PhysicalResourceId,
      });
      const response = await client.send(deleteCommand);

      return {
        PhysicalResourceId: event.PhysicalResourceId
      };
    }
    case 'Update': {
      const updateCommand = new UpdateSlotTypeCommand({
        ...params,
        botVersion: params.botVersion || 'DRAFT',
        slotTypeId: event.PhysicalResourceId,
      });
      const response = await client.send(updateCommand);

      return {
        PhysicalResourceId: response.slotTypeId
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
