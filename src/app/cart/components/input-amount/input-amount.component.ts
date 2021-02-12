import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { debounceTime, tap } from 'rxjs/operators';

import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss'],
})
export class InputAmountComponent implements OnInit {

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

  public ngOnInit(): void {
    this._addOnChange();
  }


  public increaseAmount(): void {
    this.amount++;
    this.amountChanged.emit(this.amount);
  }

  public decreaseAmount(): void {
    this.amount--;
    this.amountChanged.emit(this.amount);
  }

  private _addOnChange(): void {
    this.group.controls.amount.valueChanges
      .pipe(
        debounceTime(300),
        tap(
          (value) => {
            this.amountChanged.emit(value);
          },
        ),
        untilDestroyed(this),
    ).subscribe();
  }

}
