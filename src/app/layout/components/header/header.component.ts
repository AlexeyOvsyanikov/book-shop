import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CartComponent , CartService } from '@app/cart';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public cartLength = 0;

  constructor(
    private readonly _cartDialog: MatDialog,
    private readonly _cartService: CartService,
  ) {
    this.cartLength = this._cartService.length;
  }

  public ngOnInit(): void {
    this._cartService.length$
      .pipe(
        tap((amount) => this.cartLength = amount),
        untilDestroyed(this),
      )
      .subscribe();
  }

  public openCart(): void {
    this._cartDialog.open(CartComponent);
  }

}
