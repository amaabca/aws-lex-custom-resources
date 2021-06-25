// v2 imports for custom resource handlers
import * as v2LexBotHandler from './handlers/lex-bot';
import * as v2LexBotLocaleHandler from './handlers/lex-bot-locale';
import * as v2LexBotAliasHandler from './handlers/lex-bot-alias';
import * as v2LexBotVersionHandler from './handlers/lex-bot-version';
import * as v2LexIntentHandler from './handlers/lex-intent';
import * as v2LexIntentPriorityHandler from './handlers/lex-intent-priority';
import * as v2LexSlotHandler from './handlers/lex-slot';
import * as v2LexSlotTypeHandler from './handlers/lex-slot-type';

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
  v2LexBotHandler: v2LexBotHandler.handler,
  v2LexBotAliasHandler: v2LexBotAliasHandler.handler,
  v2LexBotLocaleHandler: v2LexBotLocaleHandler.handler,
  v2LexBotVersionHandler: v2LexBotVersionHandler.handler,
  v2LexIntentHandler: v2LexIntentHandler.handler,
  v2LexIntentPriorityHandler: v2LexIntentPriorityHandler.handler,
  v2LexSlotHandler: v2LexSlotHandler.handler,
  v2LexSlotTypeHandler: v2LexSlotTypeHandler.handler
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
  v2Handlers as handlers
}
