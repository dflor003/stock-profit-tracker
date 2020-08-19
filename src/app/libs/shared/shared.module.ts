import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointsDirective } from './components/breakpoints/breakpoints.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShellComponent } from './components/shell/shell.component';
import { SpacerComponent } from './components/spacer/spacer.component';
import { WebviewDirective } from './directives/webview/webview.directive';
import { MaterialModule } from './material.module';

const declarations = [
  ShellComponent,
  PageNotFoundComponent,
  SpacerComponent,
  WebviewDirective,
  BreakpointsDirective,
];

@NgModule({
  declarations: [...declarations],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [...declarations, MaterialModule],
})
export class SharedModule {}
