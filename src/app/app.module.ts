import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core/core.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { LayoutModule } from '@libs/layout/layout.module';


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
