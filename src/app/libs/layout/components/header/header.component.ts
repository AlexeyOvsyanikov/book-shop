import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { CartComponent , CartService , ICart } from '@app/cart';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  public cart: ICart;

  constructor(
    private readonly _cartDialog: MatDialog,
    private readonly _cartService: CartService,
  ) {
    this.cart = this._cartService.cart;
  }

  public ngOnInit(): void {
  }

  public openCart(): void {
    this._cartDialog.open(CartComponent);
  }

}
