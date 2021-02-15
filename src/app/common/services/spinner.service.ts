import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  private readonly _rotate$ = new BehaviorSubject<boolean>(false);

  public get rotate$(): Observable<boolean> {
    return this._rotate$.asObservable();
  }

  public start(): void {
    if (!this._rotate$.value) {
      this._rotate$.next(true);
    }
  }

  public stop(): void {
    if (this._rotate$.value) {
      this._rotate$.next(false);
    }
  }

}
