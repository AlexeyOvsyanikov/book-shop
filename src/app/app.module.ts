import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from '@libs/layout';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    LayoutModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
