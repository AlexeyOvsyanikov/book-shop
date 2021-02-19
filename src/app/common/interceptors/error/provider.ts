import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './error.interceptor';

export const ERROR_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS ,
  useClass: ErrorInterceptor,
  multi: true,
};
