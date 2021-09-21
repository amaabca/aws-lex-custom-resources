import {
  Construct,
  Reference,
} from '@aws-cdk/core';
import {
  LexBot,
  LexBotLocale,
} from '..';
import {
  LexBotAttributes,
  LexBotLocaleAttributes,
} from '../lex-data-types';

export default class {
  scope: Construct;
  id: string;
  serviceToken: string | Reference;
  props: LexBotAttributes;
  locales: LexBotLocale[];

  constructor(
    scope: Construct,
    id: string,
    serviceToken: string | Reference,
    props: LexBotAttributes
  ) {
    this.scope = scope;
    this.id = id;
    this.serviceToken = serviceToken;
    this.props = props;
    this.locales = [];
  }

  addLocale(localeProps: LexBotLocaleAttributes) {
    const locale = new LexBotLocale(localeProps);
    this.locales.push(locale);
    return locale;
  }

  definition() {
    const configuration = { ...this.props };
    configuration['CR.botLocales'] = this.locales.map((l) => l.definition());
    return configuration;
  }

  build() {
    return new LexBot(this.scope, this.id, this.serviceToken, this.definition());
  }
}
