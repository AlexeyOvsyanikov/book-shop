import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( request.url.startsWith('/api') ) {
      return next.handle(request.clone({
        url: `http://alexo.kubesh.ru${request.url}`
      }));
    }
    return next.handle(request);
  }
}
