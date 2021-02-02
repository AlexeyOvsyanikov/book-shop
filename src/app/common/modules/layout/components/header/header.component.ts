import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { CartComponent } from '@app/modules/cart/components/cart/cart.component';
import { ICart } from '@app/modules/cart/interface/cart.interface';
import { CartService } from '@app/modules/cart/services/cart/cart.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public cart: ICart;

  public constructor(
    private _cartDialog: MatDialog,
    private _cartService: CartService
  ) {
    this.cart = this._cartService.cart;
  }

  public ngOnInit(): void {
  }

  public openCart(){
    this._cartDialog.open(CartComponent);
  }

}
