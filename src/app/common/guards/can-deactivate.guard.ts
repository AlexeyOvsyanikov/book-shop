import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

import { ICanComponentDeactivate } from '../interface/component.can.deactivate.interface';
import { ConfirmDialogService } from '../services/confirm.dialog.service';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<ICanComponentDeactivate> {

  constructor(
    private _confirmDialogService: ConfirmDialogService,
  ) { }

  public canDeactivate(
    component: ICanComponentDeactivate,
  ): Observable<boolean> | Promise<true> | boolean {
    if (component.canDeactivate && !component.canDeactivate()) {
      return this._confirmDialogService
        .open('Are you sure to leave the page? Your changes will not be saved!');
    }

    return true;
  }

}
