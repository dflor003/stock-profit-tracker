import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoggingModule } from '../logging';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoggingModule],
  exports: [CommonModule, LoggingModule],
})
export class CoreModule {}
