import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Observable, throwError, of } from 'rxjs';
import { filter, tap, catchError } from 'rxjs/operators';

import { SNACK_BAR_ERROR_CONFIG } from '../../constants/snackbar';
import { SpinnerService } from '../../services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    @Inject(SNACK_BAR_ERROR_CONFIG)
    private readonly _snackBarErrorConfig: MatSnackBarConfig,
    private readonly _spinnerService: SpinnerService,
    private readonly _snackBarService: MatSnackBar,
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone();

    return next.handle(newRequest)
      .pipe(
        catchError((error) => {
          this._snackBarService.open(error.statusText , 'Close' , this._snackBarErrorConfig);
          this._spinnerService.stop();

          return throwError(error);
        }),
      );
  }

}
