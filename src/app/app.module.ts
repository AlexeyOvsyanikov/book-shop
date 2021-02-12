import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core';
import { LayoutModule } from '@app/layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    LayoutModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
