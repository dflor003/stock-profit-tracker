import { InjectionToken, Provider } from '@angular/core';

import { LogLevel } from './log-level';

export const LOGGER_OPTIONS = new InjectionToken<string>('LOGGER_OPTIONS');

export interface LoggerOptions {
  colorize: boolean;
  logLevel: LogLevel;
}

export const DefaultLoggerOptions: LoggerOptions = {
  colorize: true,
  logLevel: LogLevel.INFO,
};

export function provideLoggerOptions(
  options: Partial<LoggerOptions>,
): Provider {
  return {
    provide: LOGGER_OPTIONS,
    useValue: {
      ...DefaultLoggerOptions,
      ...(options || {}),
    },
  };
}
