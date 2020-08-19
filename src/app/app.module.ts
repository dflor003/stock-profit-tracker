import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'reflect-metadata';
import '../polyfills';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { CoreModule } from './libs/core/core.module';
import { LoggingModule } from './libs/logging';
import { SharedModule } from './libs/shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Core angular modules
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Framework modules
    CoreModule,
    SharedModule,
    LoggingModule.forRoot({}),

    // Feature modules
    HomeModule,

    // App-wide routing
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
