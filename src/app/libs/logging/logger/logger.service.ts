import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';

import { ConsolePolyfill } from '../console-polyfill/console-polyfill';
import { LogLevel } from '../logger-options/log-level';
import {
  DefaultLoggerOptions,
  LOGGER_OPTIONS,
  LoggerOptions,
} from '../logger-options/logger-options';

export const LOGGER_NAMESPACE = new InjectionToken<string>('LOGGER_NAMESPACE');

const isDarkMode =
  !!window.matchMedia &&
  !!window.matchMedia('(prefers-color-scheme: dark)').matches;
const ColorMap: Record<LogLevel, string> = {
  [LogLevel.TRACE]: isDarkMode ? '#919191' : 'gray',
  [LogLevel.DEBUG]: isDarkMode ? 'white' : 'black',
  [LogLevel.INFO]: isDarkMode ? '#1aa3ff' : '#0653ee',
  [LogLevel.SUCCESS]: isDarkMode ? '#44cc41' : '#399636',
  [LogLevel.WARN]: isDarkMode ? '#ff9800' : '#5d3b00',
  [LogLevel.ERROR]: isDarkMode ? '#ff0000' : '#ff0000',
};

@Injectable()
export class Logger {
  private readonly namespace: string;
  private readonly console: ConsolePolyfill = new ConsolePolyfill();
  private readonly options: LoggerOptions;

  constructor(
    @Inject(LOGGER_NAMESPACE)
    @Optional()
    namespace = 'DEFAULT',
    @Inject(LOGGER_OPTIONS)
    @Optional()
    options: LoggerOptions = DefaultLoggerOptions,
  ) {
    this.namespace = namespace;
    this.options = options;
    this.trace = this.trace.bind(this);
    this.debug = this.debug.bind(this);
    this.info = this.info.bind(this);
    this.success = this.success.bind(this);
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
    this.group = this.group.bind(this);
    this.groupStart = this.groupStart.bind(this);
    this.groupEnd = this.groupEnd.bind(this);
    this.groupAsync = this.groupAsync.bind(this);
  }

  static forNamespace(namespace: string) {
    return new Logger(namespace);
  }

  getNamespace(): string {
    return this.namespace;
  }

  named(namespace: string) {
    return new Logger(namespace, this.options);
  }

  trace(message: string, ...args: any[]): this {
    this.logMessage(LogLevel.TRACE, this.console.trace, message, args);
    return this;
  }

  debug(message: string, ...args: any[]): this {
    this.logMessage(LogLevel.DEBUG, this.console.debug, message, args);
    return this;
  }

  info(message: string, ...args: any[]): this {
    this.logMessage(LogLevel.INFO, this.console.info, message, args);
    return this;
  }

  success(message: string, ...args: any[]): this {
    this.logMessage(LogLevel.SUCCESS, this.console.info, message, args);
    return this;
  }

  warn(message: string, ...args: any[]): this {
    this.logMessage(LogLevel.WARN, this.console.warn, message, args);
    return this;
  }

  error(message: string, ...args: any[]): this {
    this.logMessage(LogLevel.ERROR, this.console.error, message, args);
    return this;
  }

  group(title: string, action: () => void): void {
    this.groupStart(title);
    try {
      action();
      this.groupEnd();
    } catch (err) {
      this.groupEnd();
      throw err;
    }
  }

  async groupAsync<T>(title: string, action: () => Promise<T>): Promise<T> {
    this.groupStart(title);
    try {
      const result = await action();
      this.groupEnd();
      return result;
    } catch (err) {
      this.groupEnd();
      throw err;
    }
  }

  groupStart(title: string): this {
    this.console.group(title);
    return this;
  }

  groupEnd(): this {
    this.console.groupEnd();
    return this;
  }

  private logMessage(
    level: LogLevel,
    target: (...args: any[]) => void,
    message: string,
    args: any[],
  ) {
    if (level < this.options.logLevel) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message);
    if (this.options.colorize) {
      target(formattedMessage.msg, ...formattedMessage.colors, ...args);
    } else {
      target(formattedMessage.msg.replace(/%c/gi, ''), ...args);
    }
  }

  private formatMessage(level: LogLevel, message: string) {
    const color = ColorMap[level];

    return {
      msg: `%c${this.namespace} [${LogLevel[level]}] | %c${message}`,
      colors: [colorize(color, true), colorize(color, false)],
    };
  }
}

function colorize(fg: string, bold = false) {
  return `
    display: block;
    line-height: 1.5em;
    padding: 0.25em 0.1em 0.25em 0.1em;
    margin: 0;
    ${bold ? 'font-weight: bold;' : ''}
    color: ${fg};
  `;
}
