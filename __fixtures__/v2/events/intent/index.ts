// NOTE: delete is a keyword - we can't import as `delete`
import create from './create.json';
import deleteEvent from './delete.json';
import unknown from './unknown.json';
import update from './update.json';

export default {
  create,
  delete: deleteEvent,
  unknown,
  update,
};
