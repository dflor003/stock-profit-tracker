// tslint:disable no-console
import { SinonStub, Stub, stubFunc, stubOf } from '../../testing/helpers';

import { ConsolePolyfill } from './console-polyfill';

describe('ConsolePolyfill', () => {
  let console: Stub<Console>;
  let noop: SinonStub;
  let polyfill: ConsolePolyfill;

  beforeEach(() => {
    noop = stubFunc();
    console = stubOf<Console>({
      log() {},
      info() {},
      warn() {},
      error() {},
      group() {},
      groupEnd() {},
    });

    polyfill = new ConsolePolyfill(console);
    (<any>polyfill).noop = noop;
  });

  it('should keep context if fields are used outside of it', () => {
    // Arrange
    const info = polyfill.info;

    // Act / Assert
    expect(() => info('Something')).not.toThrow();
  });

  describe('trace', () => {
    describe('when no log', () => {
      it('should log to noop', () => {
        // Arrange
        delete console.log;

        // Act
        polyfill.trace('foo');

        // Assert
        expect(noop).toHaveBeenCalledWith('foo');
      });
    });

    describe('when log exists', () => {
      it('should log to console.log', () => {
        // Act
        polyfill.trace('foo');

        // Assert
        expect(console.log).toHaveBeenCalledWith('foo');
      });
    });
  });

  describe('debug', () => {
    describe('when no log', () => {
      it('should log to noop', () => {
        // Arrange
        delete console.log;

        // Act
        polyfill.debug('bar');

        // Assert
        expect(noop).toHaveBeenCalledWith('bar');
      });
    });

    describe('when log exists', () => {
      it('should log to console.log', () => {
        // Act
        polyfill.debug('bar');

        // Assert
        expect(console.log).toHaveBeenCalledWith('bar');
      });
    });
  });

  describe('info', () => {
    describe('when no info or log', () => {
      it('should log to noop', () => {
        // Arrange
        delete console.log;
        delete console.info;

        // Act
        polyfill.info('baz');

        // Assert
        expect(noop).toHaveBeenCalledWith('baz');
      });
    });

    describe('when no info', () => {
      it('should fallback to console.log', () => {
        // Arrange
        delete console.info;

        // Act
        polyfill.info('baz');

        // Assert
        expect(console.log).toHaveBeenCalledWith('baz');
      });
    });

    describe('when info exists', () => {
      it('should use console.info', () => {
        // Act
        polyfill.info('baz');

        // Assert
        expect(console.info).toHaveBeenCalledWith('baz');
      });
    });
  });

  describe('warn', () => {
    describe('when no warn, error, or log', () => {
      it('should log to noop', () => {
        // Arrange
        delete console.log;
        delete console.warn;
        delete console.error;

        // Act
        polyfill.warn('yar');

        // Assert
        expect(noop).toHaveBeenCalledWith('yar');
      });
    });

    describe('when no warn or error', () => {
      it('should fallback to console.log', () => {
        // Arrange
        delete console.warn;
        delete console.error;

        // Act
        polyfill.warn('yar');

        // Assert
        expect(console.log).toHaveBeenCalledWith('yar');
      });
    });

    describe('when no warn', () => {
      it('should fallback to console.error', () => {
        // Arrange
        delete console.warn;

        // Act
        polyfill.warn('yar');

        // Assert
        expect(console.error).toHaveBeenCalledWith('yar');
      });
    });

    describe('when warn exists', () => {
      it('should use console.warn', () => {
        // Act
        polyfill.warn('yar');

        // Assert
        expect(console.warn).toHaveBeenCalledWith('yar');
      });
    });
  });

  describe('error', () => {
    describe('when no error or log', () => {
      it('should log to noop', () => {
        // Arrange
        delete console.log;
        delete console.error;

        // Act
        polyfill.error('foo');

        // Assert
        expect(noop).toHaveBeenCalledWith('foo');
      });
    });

    describe('when no error', () => {
      it('should fallback to console.log', () => {
        // Arrange
        delete console.error;

        // Act
        polyfill.error('foo');

        // Assert
        expect(console.log).toHaveBeenCalledWith('foo');
      });
    });

    describe('when error exists', () => {
      it('should use console.error', () => {
        // Act
        polyfill.error('foo');

        // Assert
        expect(console.error).toHaveBeenCalledWith('foo');
      });
    });
  });

  describe('group', () => {
    describe('when no group', () => {
      it('should log to noop', () => {
        // Arrange
        delete console.group;

        // Act
        polyfill.group('some group');

        // Assert
        expect(noop).toHaveBeenCalledWith('some group');
      });
    });

    describe('when group exists', () => {
      it('should use console.group', () => {
        // Act
        polyfill.group('some group');

        // Assert
        expect(console.group).toHaveBeenCalledWith('some group');
      });
    });
  });

  describe('groupEnd', () => {
    describe('when no groupEnd', () => {
      it('should log to noop', () => {
        // Arrange
        delete console.groupEnd;

        // Act
        polyfill.groupEnd();

        // Assert
        expect(noop).toHaveBeenCalled();
      });
    });

    describe('when groupEnd exists', () => {
      it('should use console.groupEnd', () => {
        // Act
        polyfill.groupEnd();

        // Assert
        expect(console.groupEnd).toHaveBeenCalled();
      });
    });
  });
});
