import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const watchFor = (
  observer: BreakpointObserver,
  breakpoint: string | string[],
) => observer.observe(breakpoint).pipe(map(state => state.matches));

export interface DisplaySizes {
  readonly xs$: Observable<boolean>;
  readonly sm$: Observable<boolean>;
  readonly md$: Observable<boolean>;
  readonly lg$: Observable<boolean>;
  readonly xl$: Observable<boolean>;
}

@Injectable({ providedIn: 'root' })
export class BreakpointsService {
  private readonly observer: BreakpointObserver;

  readonly isHandset$: Observable<boolean>;
  readonly isDesktop$: Observable<boolean>;
  readonly isTablet$: Observable<boolean>;
  readonly isPortrait$: Observable<boolean>;
  readonly isLandscape$: Observable<boolean>;
  readonly size: DisplaySizes;

  constructor(observer: BreakpointObserver) {
    this.observer = observer;
    this.isHandset$ = this.watch(Breakpoints.Handset);
    this.isDesktop$ = this.watch(Breakpoints.Web);
    this.isTablet$ = this.watch(Breakpoints.Tablet);
    this.isLandscape$ = this.watch([
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletLandscape,
      Breakpoints.WebLandscape,
    ]);
    this.isPortrait$ = this.watch([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait,
      Breakpoints.WebPortrait,
    ]);
    this.size = {
      xs$: this.watch(Breakpoints.XSmall),
      sm$: this.watch(Breakpoints.Small),
      md$: this.watch(Breakpoints.Medium),
      lg$: this.watch(Breakpoints.Large),
      xl$: this.watch(Breakpoints.XLarge),
    };
  }

  watch(breakpoint: string | string[]): Observable<boolean> {
    return watchFor(this.observer, breakpoint);
  }

  isMatch(breakpoint: string | string[]) {
    return this.observer.isMatched(breakpoint);
  }
}
