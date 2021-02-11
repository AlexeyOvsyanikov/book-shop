import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CartComponent , CartService } from '@app/cart';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public cartLength$: Observable<number>;

  constructor(
    private readonly _cartDialog: MatDialog,
    private readonly _cartService: CartService,
  ) {
    this.cartLength$ = this._cartService.length$;
  }

  public ngOnInit(): void {}

  public openCart(): void {
    this._cartDialog.open(CartComponent);
  }

}
