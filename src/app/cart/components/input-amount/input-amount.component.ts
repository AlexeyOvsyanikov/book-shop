import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

import { debounceTime, tap } from 'rxjs/operators';

import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputAmountComponent),
    multi: true,
  }],
})
export class InputAmountComponent implements OnInit, ControlValueAccessor {

  public amount!: number;
  public group: FormGroup;

  constructor() {
    this.group = new FormGroup({
      amount: new FormControl(),
    });
  }

  public ngOnInit(): void {
    this._addOnChange();
  }

  public writeValue(amount: number): void {
    this.amount = amount;
  }

  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  public increaseAmount(): void {
    this.amount++;
    this._checkAndFixAmount();
  }

  public decreaseAmount(): void {
    this.amount--;
    this._checkAndFixAmount();
  }

  private _addOnChange(): void {
    this.group.controls.amount.valueChanges
      .pipe(
        debounceTime(400),
        tap(() => {
          this._checkAndFixAmount();
          this._onChange(this.amount);
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  private _checkAndFixAmount(): void {
    const amount = Number(this.amount);

    if (!amount) {
      this.amount = 1;
    }

    this._onChange(this.amount);
    this._onTouch(this.amount);
  }

  private _onChange(amount: number): void {}
  private _onTouch(amount: number): void {}


}
