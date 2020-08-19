import { Provider } from '@angular/core';
import { Logger } from '../../logging';
import { stubOf } from '../helpers';

export function provideMockLogger(): Provider {
  return {
    provide: Logger,
    useFactory: () => mockLogger(),
  };
}

export function mockLogger() {
  const logger = stubOf(Logger);
  logger.named.returns(logger);
  return logger;
}
