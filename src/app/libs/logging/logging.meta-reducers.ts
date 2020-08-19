import { ActionReducer } from '@ngrx/store';

import { Logger } from './logger/logger.service';

export function logActionsReducer(logger: Logger) {
  const log = logger.named('ACTION');
  return (reducer: ActionReducer<any>): ActionReducer<any> => (
    state,
    action,
  ) => {
    if (action.type.indexOf('@ngrx') !== 0) {
      log.trace(`${action.type}`, action);
    }
    return reducer(state, action);
  };
}
