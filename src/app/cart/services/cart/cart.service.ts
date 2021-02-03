import { Injectable } from '@angular/core';

import { StorageMap } from '@ngx-pwa/local-storage';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IBook } from '@app/books/interface/book.interface';
import { ICart } from '@app/cart/interface/cart.interface';
import { ICartitem } from '@app/cart/interface/cart.item.interface';
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CartService {

  public cart: ICart = {
    cartItems: [],
    cartTotal: 0,
  };

  public constructor(
      private readonly _storage: StorageMap,
  ) {
    this._storage.get('cart')
      .subscribe((cart) => {
        if (cart) {
          const deserializedCart = cart as ICart;
          this.cart.cartItems = deserializedCart.cartItems;
          this.cart.cartTotal = deserializedCart.cartTotal;
        } else {
          this._storage.set('cart', this.cart)
            .pipe(
              untilDestroyed(this),
            ).subscribe();
        }
      });
  }

  public addToCart(item: ICartitem): void {
    const checkItem = this.cart.cartItems.find((b) => b.id === item.id);
    if (!checkItem) {
      this.cart.cartItems.push(item);
      this.cart.cartTotal += item.price;
      this._storage.set('cart', this.cart)
        .pipe(
          untilDestroyed(this),
        ).subscribe();
    }
  }

  public updateItemAmount(up: boolean , item: ICartitem): void {
    if (up) {
      this.cart.cartTotal += item.price;
    } else {
      this.cart.cartTotal -= item.price;
    }
    this._storage.set('cart', this.cart)
      .pipe(
        untilDestroyed(this),
      ).subscribe();
  }

  public removeFromCart(id: number): void {
    const itemIndex = this.cart.cartItems.findIndex((i) => i.id === id);

    if (itemIndex !== -1) {
      this.cart.cartItems.splice(itemIndex, 1);
      this._storage.set('cart', this.cart)
        .pipe(
          untilDestroyed(this),
        ).subscribe();
    }
  }

  public markItem(book: IBook): void {
    const checkItem = this.cart.cartItems.find((b) => b.id === book.id);
    if (checkItem) {
      book.isInCart = true;
    }
  }

  private _countCartTotal(): void {

  }

}
