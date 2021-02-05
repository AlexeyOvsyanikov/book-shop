import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { LayoutModule } from '@libs/layout';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    LayoutModule,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
