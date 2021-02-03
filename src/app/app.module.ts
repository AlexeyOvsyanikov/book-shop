import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core/core.module';
import { LayoutModule } from '@libs/layout/layout.module';
import { AppRoutingModule } from '@app/app-routing.module';

import { AppComponent } from '@app/app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    LayoutModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
