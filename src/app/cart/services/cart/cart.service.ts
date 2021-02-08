import { Injectable } from '@angular/core';

import { IBook } from '@app/books';
import { ICart , ICartitem } from '@app/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  public cart: ICart = {
    cartItems: [],
    cartTotal: 0,
  };

  private _books: IBook[] = [];

  constructor() {
    const cart = localStorage.getItem('cart');

    if (cart) {
      const deserializedCart = JSON.parse(cart);
      this.cart.cartItems = deserializedCart.cartItems;
      this.cart.cartTotal = deserializedCart.cartTotal;
    } else {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  public addToCart(item: ICartitem , book: IBook): void {
    const checkItem = this.cart.cartItems.find((b) => b.id === item.id);

    if (!checkItem) {
      this.cart.cartItems.push(item);

      const checkBook = this._books.find((b) => b.id === item.id);

      if (!checkBook) {
        this._books.push(book);
      }

      this._reloadCartTotal();

      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  public updateItemAmount(up: boolean , item: ICartitem): void {
    item.amount = up ? item.amount + 1 : item.amount - 1;

    const realItem = this.cart.cartItems.find((i) => i.id === item.id);

    if (realItem) {
      realItem.amount = item.amount;
    }

    this._reloadCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public changeAmount(amount: number, id: number): void {
    const item = this.cart.cartItems.find((i) => i.id === id);

    if (item) {
      item.amount = amount;
    }

    this._reloadCartTotal();
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public removeFromCart(id: number): void {
    const itemIndex = this.cart.cartItems.findIndex((i) => i.id === id);

    if (itemIndex !== -1) {
      this.cart.cartItems.splice(itemIndex, 1);

      this._reloadCartTotal();
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    const checkBook = this._books.find((b) => b.id === id);
    const checkBookIndex = this._books.findIndex((b) => b.id === id);

    if (checkBook) {
      checkBook.isInCart = false;
      this._books.splice(checkBookIndex , 1);
    }
  }

  public isInCart(book: IBook): boolean {
    const bookIndex = this.cart.cartItems.findIndex((b) => b.id === book.id);

    return bookIndex !== -1;
  }

  public initBooks(books: IBook[]): void {
    this._books = books;
  }

  private _reloadCartTotal(): void {
    this.cart.cartTotal = this.cart.cartItems.map((i) => {
      return i.amount * i.price;
    }).reduce((acc , current) => acc + current , 0);
  }

}
