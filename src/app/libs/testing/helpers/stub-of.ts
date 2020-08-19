import { SinonStub, stub as sinonStub } from 'sinon';

export { SinonStub, match } from 'sinon';

/**
 * A generic type based on T such that it has these two properties:
 * 1. It contains all of the same members as T except
 *    their types are {SinonStub}.
 * 2. It intersects with T such that it can be passed where T is expected.
 */
export type Stub<T> = { [P in keyof T]: SinonStub } & T;

export type Type<T> = new (...args: any[]) => T;

const { getPrototypeOf } = Object;
const getProtoProps = Object.getOwnPropertyNames || Object.keys;
const isClass = (obj: any) => obj && obj.constructor === Function;

/**
 * Generates a stub for the given object or class. There are three distinct
 * ways of using this:
 *
 * For objects defined with a proper prototype chain, if you pass in an instance
 * of an ES6 class, it will generate a stub based off the class structure in its
 * prototype.
 * Here's an example of that:
 *
 * class MyClass {
 *   method1() {
 *     ...
 *   }
 *
 *   method2() {
 *     ...
 *   }
 * }
 *
 * describe('Some test', () => {
 *   let myClass: Stub<MyClass>;
 *
 *   beforeEach(() => {
 *     myClass = stubOf(MyClass);
 *   });
 * });
 *
 * For cases such as framework-level classes where it cannot detect the
 * properties
 * off of the prototype of the class, you can pass in a list of properties
 * to generate as one or more arguments after the class. Here's an example:
 *
 * let activatedRoute: Stub<ActivatedRoute>;
 *
 * beforeEach(() => {
 *   activatedRoute = stubOf(ActivatedRoute, 'params', 'queryParams');
 * });
 *
 * As a last resort, you can pass a dummy object instance representing the
 * fields you need stubbed like so:
 *
 * const myStub = stubOf<SomeService>({
 *   method1() { },
 *   method2() { },
 *   method3() { },
 * });
 *
 * @param structure A class or object instance to stub.
 * @param keysToPick (Optional) When passing the class, you can pass just a
 *                     subset of properties to mock out.
 * @return A stub for that class where all fields are instances of {SinonStub}.
 */
export function stubOf<T, K extends keyof T>(
  structure: Type<T>,
  ...keysToPick: K[]
): Stub<T>;
export function stubOf<T>(
  structure: Type<T> | Record<string, unknown> | string[],
): Stub<T>;
export function stubOf<T>(
  structure: Type<T> | Record<string, unknown>,
  ...keysToPick: string[]
): Stub<T> {
  // If you pass a class, build a stub based off the properties in its prototype
  if (isClass(structure)) {
    // Stub out all prototype properties
    const props: string[] =
      keysToPick && keysToPick.length
        ? Array.of(...keysToPick)
        : getAllProps(structure);

    return <any>sinonStub(
      props.reduce(
        (obj, key) => ({
          ...obj,
          [key]: () => {},
        }),
        {},
      ),
    );
  }

  // For array of properties, generate a sinon stub for that
  if (Array.isArray(structure)) {
    return <any>(
      sinonStub(Object.fromEntries(structure.map(prop => [prop, () => {}])))
    );
  }

  // For a regular object instance, pass directly to stub
  // as its supported already
  return <any>sinonStub(structure);
}

/**
 * Returns a sinon stub function.
 * @return A sinon stub function.
 */
export function stubFunc(): SinonStub {
  return sinonStub();
}

// Discover names of properties up the prototype chain
function getAllProps(structure: any): string[] {
  if (!structure || structure === getPrototypeOf(Function)) {
    return [];
  }

  const methods = getProtoProps(structure.prototype)
    .filter(prop => prop !== 'constructor')
    .filter(prop => typeof structure.prototype[prop] === 'function');

  return [...methods, ...getAllProps(getPrototypeOf(structure))];
}
