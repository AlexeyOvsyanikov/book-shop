import { Component, OnInit } from '@angular/core';

import { ICart } from '@app/cart/interface/cart.interface';
import { CartService } from '@app/cart/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  public cart: ICart;

  public constructor(
    private readonly _cartService: CartService,
  ) {
    this.cart = this._cartService.cart;
  }

  public ngOnInit(): void {
    this.cart.cartItems.push();
    this.cart.cartItems.push();
    this.cart.cartItems.push();
  }

}
