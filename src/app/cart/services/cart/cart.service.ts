import { Injectable } from '@angular/core';

import { ICart } from '@app/cart/interface/cart.interface';
import { ICartitem } from '@app/cart/interface/cart.item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  public cart: ICart = {
    cartItems: [],
    cartTotal: 0,
  };

  public constructor(

  ) { }

  public addToCart(item: ICartitem): void {
    this.cart.cartItems.push(item);
    this.cart.cartTotal += item.price;
  }

  public removeFromCart(id: number): void {
    const itemIndex = this.cart.cartItems.findIndex((i) => i.id === id);

    if (itemIndex !== -1) {
      this.cart.cartItems.splice(itemIndex, 1);
    }
  }

  private _countCartTotal(): void {

  }

}
