import { Provider } from '@angular/core';

import { stubOf, Type } from './stub-of';

/**
 * Provides a mock instance of the passed type to the DI system. Use this when
 * testing to mock things out as part of TestBed.configureTestingModule(...).
 *
 * Example:
 *
 * TestBed.configureTestingModule({
 *  ...
 *  providers: [
 *    provideMockOf(MyService)
 *  ]
 * })
 *
 * @param type A class to mock.
 */
export function provideMockOf<T>(type: Type<T>): Provider {
  return {
    provide: type,
    useFactory: () => stubOf(type),
  };
}
