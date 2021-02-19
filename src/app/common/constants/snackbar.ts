import { InjectionToken } from '@angular/core';

import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const SNACK_BAR_SUCCESS_CONFIG = new InjectionToken<MatSnackBarConfig>(
  'SnackBarSuccessConfig',
  {
    factory: () => ({
      duration: 4000,
      panelClass: 'app-mat-snack-bar-success',
    }),
  },
);

export const SNACK_BAR_ERROR_CONFIG = new InjectionToken<MatSnackBarConfig>(
  'SnackBarErrorConfig',
  {
    factory: () => ({
      duration: 4000,
      panelClass: 'app-mat-snack-bar-error',
    }),
  },
);
