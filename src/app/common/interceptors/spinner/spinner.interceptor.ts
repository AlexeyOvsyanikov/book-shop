
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { SpinnerService } from '../../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private readonly _spinerService: SpinnerService,
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url;

    if (url.indexOf('/api/') !== -1) {
      const newRequest = request.clone();

      this._spinerService.start();

      return next.handle(newRequest)
        .pipe(
          filter((httpEvent) => httpEvent.type === HttpEventType.Response),
          tap(() => {
            this._spinerService.stop();
          }),
        );
    }

    return next.handle(request);
  }

}
