import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import {
  breakpointsForShorthand,
  BreakpointShorthand,
} from './breakpoint-shorthand';
import { BreakpointsService } from './breakpoints.service';

export type ShorthandSizes = BreakpointShorthand | BreakpointShorthand[];

@Directive({
  selector: '[stkShowOn],[stkHideOn]',
})
export class BreakpointsDirective implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly templateRef: TemplateRef<any>;
  private readonly viewContainerRef: ViewContainerRef;
  private invert = false;
  private hasView = false;

  readonly breakpoints: BreakpointsService;
  readonly sizes$ = new BehaviorSubject<ShorthandSizes>([]);

  @Input('stkShowOn')
  showOnSizes: ShorthandSizes;

  @Input('stkHideOn')
  hideOnSizes: ShorthandSizes;

  constructor(
    templateRef: TemplateRef<any>,
    viewContainerRef: ViewContainerRef,
    breakpoints: BreakpointsService,
  ) {
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.breakpoints = breakpoints;
  }

  static normalizeSizes(sizes: ShorthandSizes): string[] {
    const asArray =
      typeof sizes === 'string' ? [sizes] : Array.isArray(sizes) ? sizes : [];

    return asArray.map(breakpointsForShorthand).flat();
  }

  ngOnInit(): void {
    // Show or hide depending on whether it matches breakpoints
    this.sizes$
      .pipe(
        takeUntil(this.destroy$),
        map(sizes => BreakpointsDirective.normalizeSizes(sizes)),
        switchMap(sizes => this.breakpoints.watch(sizes)),
        map(isMatch => (this.invert ? !isMatch : isMatch)),
      )
      .subscribe(isMatch => {
        if (isMatch) {
          this.showTemplate();
        } else {
          this.hideTemplate();
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.showOnSizes) {
      this.invert = false;
      this.sizes$.next(this.showOnSizes || []);
    } else if (changes.hideOnSizes) {
      this.invert = true;
      this.sizes$.next(this.hideOnSizes || []);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private showTemplate() {
    if (!this.hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  private hideTemplate() {
    if (this.hasView) {
      this.viewContainerRef.clear();
      this.hasView = false;
    }
  }
}
