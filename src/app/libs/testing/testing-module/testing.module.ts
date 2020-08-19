import { NgModule } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockLogger } from '../mocks';

@NgModule({
  exports: [RouterTestingModule],
  providers: [provideMockLogger()],
})
export class TestingModule {}
