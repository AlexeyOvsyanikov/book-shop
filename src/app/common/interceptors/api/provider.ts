import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from './api.interceptor';

export const API_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS ,
  useClass: ApiInterceptor,
  multi: true,
};
