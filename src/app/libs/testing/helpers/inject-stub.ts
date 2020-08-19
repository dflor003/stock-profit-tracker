import { AbstractType, InjectionToken, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Stub } from './stub-of';

export const injectStub = <T>(
  token: Type<T> | InjectionToken<T> | AbstractType<T>,
): Stub<T> => TestBed.inject(token) as Stub<T>;
