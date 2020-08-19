import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BreakpointsService } from '../breakpoints/breakpoints.service';

@Component({
  selector: 'stk-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent {
  readonly breakpoints: BreakpointsService;

  @Input()
  title = 'Stock Profit Tracker';

  @Input()
  showMenu = true;

  constructor(breakpoints: BreakpointsService) {
    this.breakpoints = breakpoints;
  }
}
