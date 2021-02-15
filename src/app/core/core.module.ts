import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { API_INTERCEPTOR , SPINNER_INTERCEPTOR } from '@common';

@NgModule({
  providers: [
    API_INTERCEPTOR,
    // SPINNER_INTERCEPTOR,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
})
export class CoreModule { }
