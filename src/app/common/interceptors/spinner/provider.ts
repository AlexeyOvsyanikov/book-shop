import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SpinnerInterceptor } from './spinner.interceptor';

export const SPINNER_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS ,
  useClass: SpinnerInterceptor,
  multi: true,
};
