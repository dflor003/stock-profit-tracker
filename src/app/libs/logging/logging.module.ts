import { ModuleWithProviders, NgModule } from '@angular/core';
import { META_REDUCERS } from '@ngrx/store';

import {
  DefaultLoggerOptions,
  LoggerOptions,
  provideLoggerOptions,
} from './logger-options/logger-options';
import { Logger } from './logger/logger.service';
import { logActionsReducer } from './logging.meta-reducers';

@NgModule({
  providers: [
    Logger,
    {
      provide: META_REDUCERS,
      deps: [Logger],
      useFactory: logActionsReducer,
      multi: true,
    },
  ],
})
export class LoggingModule {
  static forRoot(
    options: Partial<LoggerOptions> = DefaultLoggerOptions,
  ): ModuleWithProviders<LoggingModule> {
    return {
      ngModule: LoggingModule,
      providers: [provideLoggerOptions(options)],
    };
  }
}
