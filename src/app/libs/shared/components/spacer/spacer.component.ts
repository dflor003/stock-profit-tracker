import { Component } from '@angular/core';

@Component({
  selector: 'stk-spacer',
  template: '',
  styles: [
    `
      :host {
        display: block;
        flex: 1 1 auto;
      }
    `,
  ],
})
export class SpacerComponent {}
