// v2 imports for custom resource handlers
import v2LexBotHandler = require('./handlers/lex-bot');
import v2LexBotLocaleHandler = require('./handlers/lex-bot-locale');
import v2LexBotAliasHandler = require('./handlers/lex-bot-alias');
import v2LexBotVersionHandler = require('./handlers/lex-bot-version');
import v2LexIntentHandler = require('./handlers/lex-intent');
import v2LexIntentPriorityHandler = require('./handlers/lex-intent-priority');
import v2LexSlotHandler = require('./handlers/lex-slot');
import v2LexSlotTypeHandler = require('./handlers/lex-slot-type');

import { LexBotAttributes } from './lex-data-types';
import LexBot from './bot/lex-bot';
import LexIntent from './intent/lex-intent';
import LexBotLocale from './bot-locale/lex-bot-locale';
import LexBotVersion from './bot-version/lex-bot-version';
import LexSlot from './slot/lex-slot';
import LexSlotType from './slot-type/lex-slot-type';
import LexBotAlias from './bot-alias/lex-bot-alias';
import LexIntentPriority from './intent-priority/lex-intent-priority';


const v2Handlers = {
  v2LexBotHandler: v2LexBotHandler,
  v2LexBotAliasHandler: v2LexBotAliasHandler,
  v2LexBotLocaleHandler: v2LexBotLocaleHandler,
  v2LexBotVersionHandler: v2LexBotVersionHandler,
  v2LexIntentHandler: v2LexIntentHandler,
  v2LexIntentPriorityHandler: v2LexIntentPriorityHandler,
  v2LexSlotHandler: v2LexSlotHandler,
  v2LexSlotTypeHandler: v2LexSlotTypeHandler,
}


export {
  LexBotAttributes,
  LexBot,
  LexIntent,
  LexIntentPriority,
  LexBotLocale,
  LexBotVersion,
  LexSlot,
  LexSlotType,
  LexBotAlias,
  v2Handlers as handlers,
}
