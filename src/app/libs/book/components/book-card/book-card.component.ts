import { Component, Input, OnInit } from '@angular/core';

import { IBook } from '@app/books';
import { CartService } from '@app/cart';
@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {

  @Input()
  public book!: IBook;

  constructor(
    private readonly _cartService: CartService,
  ) { }

  public ngOnInit(): void {
    if (this.book) {
      this.book.isInCart = this._cartService.isInCart(this.book);
    }
  }

  public toggleToCart(book: IBook): void {
    book.isInCart = !book.isInCart;

    if (book.isInCart) {
      this._cartService.addToCart({
        id: book.id,
        amount: 1,
        price: book.price,
      } , book);
    } else {
      this._cartService.removeFromCart(book.id);
    }
  }

}
