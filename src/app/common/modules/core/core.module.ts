import { NgModule } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';

import { ApiInterceptor } from '@app/common/interceptors/api.interceptor';

import { LayoutModule } from '@app/common/modules/layout/layout.module';
import { AppRoutingModule } from '@app/app-routing.module';

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
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: ApiInterceptor,
  //     multi: true
  //   }
  // ],
})
export class CoreModule { }
