import { Component, OnInit } from '@angular/core';

import { ICart } from '@app/modules/cart/interface/cart.interface';
import { CartService } from '@app/modules/cart/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: ICart;

  constructor(
    private _cartService: CartService
  ) {
    this.cart = this._cartService.cart;
  }

  ngOnInit(): void {

    this.cart.cartItems.push();
    this.cart.cartItems.push();
    this.cart.cartItems.push();

  }

}
