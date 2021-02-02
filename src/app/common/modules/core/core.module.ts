import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { ApiInterceptor } from '../../interceptors/api.interceptor';

import { LayoutModule } from '../layout/layout.module';
import { AppRoutingModule } from '../../../app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
  ],
  exports:[
    AppRoutingModule,
    LayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
})
export class CoreModule { }
