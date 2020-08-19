// tslint:disable no-console
/**
 * Console polyfill to normalize logging functions and logging behavior
 * across different browsers and browser versions.
 */
export class ConsolePolyfill {
  private readonly console: Console;
  private readonly noop = () => {};

  constructor(console = window['console'] || <any>{}) {
    this.console = console;

    // Binds all methods to this context
    Object.getOwnPropertyNames(ConsolePolyfill.prototype)
      .filter(
        key =>
          typeof (this as any)[key] === 'function' && key !== 'constructor',
      )
      .forEach(key => ((this as any)[key] = (this as any)[key].bind(this)));
  }

  trace(...args: any[]): void {
    const target = this.console.log || this.noop;
    target.apply(this.console, args);
  }

  debug(...args: any[]): void {
    const target = this.console.log || this.noop;
    target.apply(this.console, args);
  }

  info(...args: any[]): void {
    const target = this.console.info || this.console.log || this.noop;
    target.apply(this.console, args);
  }

  warn(...args: any[]): void {
    const target =
      this.console.warn || this.console.error || this.console.log || this.noop;
    target.apply(this.console, args);
  }

  error(...args: any[]): void {
    const target = this.console.error || this.console.log || this.noop;
    target.apply(this.console, args);
  }

  group(...args: any[]): void {
    const target = this.console.group || this.noop;
    target.apply(this.console, args);
  }

  groupEnd(): void {
    const target = this.console.groupEnd || this.noop;
    target.apply(this.console);
  }
}
