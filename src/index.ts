import * as cdkResources from './lex-custom-cdk-resources/index';
import LexBotHandler = require('./handlers/lex-bot');
import LexBotLocaleHandler = require('./handlers/lex-bot-locale');
import LexBotAliasHandler = require('./handlers/lex-bot-alias');
import LexBotVersionHandler = require('./handlers/lex-bot-version');
import LexIntentHandler = require('./handlers/lex-intent');
import LexIntentPriorityHandler = require('./handlers/lex-intent-priority');
import LexSlotHandler = require('./handlers/lex-slot');
import LexSlotTypeHandler = require('./handlers/lex-slot-type');

import { LexBotAttributes } from './lex-data-types';
import LexBot from './bot/lex-bot';
import LexIntent from './intent/lex-intent';
import LexBotLocale from './bot-locale/lex-bot-locale';
import LexBotVersion from './bot-version/lex-bot-version';
import LexSlot from './slot/lex-slot';
import LexSlotType from './slot-type/lex-slot-type';
import LexBotAlias from './bot-alias/lex-bot-alias';
import LexIntentPriority from './intent-priority/lex-intent-priority';


const Handlers = {
  LexBotHandler: LexBotHandler,
  LexBotAliasHandler: LexBotAliasHandler,
  LexBotLocaleHandler: LexBotLocaleHandler,
  LexBotVersionHandler: LexBotVersionHandler,
  LexIntentHandler: LexIntentHandler,
  LexIntentPriorityHandler: LexIntentPriorityHandler,
  LexSlotHandler: LexSlotHandler,
  LexSlotTypeHandler: LexSlotTypeHandler,
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
  Handlers as handlers,
  cdkResources,
}
