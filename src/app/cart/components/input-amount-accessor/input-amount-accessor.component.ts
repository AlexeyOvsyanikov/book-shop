import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

import { debounceTime, tap } from 'rxjs/operators';

import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-input-amount-accessor',
  templateUrl: './input-amount-accessor.component.html',
  styleUrls: ['./input-amount-accessor.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputAmountAccessorComponent),
    multi: true,
  }],
})
export class InputAmountAccessorComponent implements OnInit, ControlValueAccessor {

  @Input()
  public amount!: number;

  @Output()
  public readonly amountChanged = new EventEmitter<number>();

  public group: FormGroup;

  constructor() {
    this.group = new FormGroup({
      amount: new FormControl(),
    });
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

  public ngOnInit(): void {
    this._addOnChange();
  }

  public update(amount: number): void {
    this.amount = amount;

    if (this.amount < 1) {
      this.amount = 1;
    }

    this.amountChanged.emit(this.amount);

    this._onChange(amount);
    this._onTouch(amount);
  }

  public increaseAmount(): void {
    this.amount++;
    this.update(this.amount);
  }

  public decreaseAmount(): void {
    this.amount--;
    this.update(this.amount);
  }

  private _addOnChange(): void {
    this.group.controls.amount.valueChanges
      .pipe(
        debounceTime(300),
        tap(
          (value) => {
            this.update(value);
          },
        ),
        untilDestroyed(this),
    ).subscribe();
  }

  private _onChange(amount: number): void {}

  private _onTouch(amount: number): void {}

}
