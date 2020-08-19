import { TestBed } from '@angular/core/testing';

import { LoggingModule } from './logging.module';

describe('LoggingModule', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [LoggingModule],
    }),
  );

  it('should create', () => {
    expect(LoggingModule).toBeDefined();
  });
});
