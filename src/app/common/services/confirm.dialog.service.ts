import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { ConfirmComponent } from './../components/confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {

  constructor(
      private readonly _dialog: MatDialog,
  ) { }

  public open(text: string): Observable<boolean> {
    return this._dialog.open(ConfirmComponent, { data: text })
      .afterClosed();
  }

}
