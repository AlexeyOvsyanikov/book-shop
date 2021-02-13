
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { SpinnerService } from '../../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(
    private readonly _spinerService: SpinnerService,
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url;

    if (url.indexOf('/api/') !== -1) {
      // this._spinerService.start();
    }

    return next.handle(request);
  }

}
