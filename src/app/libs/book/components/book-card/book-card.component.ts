import { Component, Input, OnInit } from '@angular/core';

import { IBook } from '@app/books/interface/book.interface';
import { CartService } from '@app/cart/services/cart/cart.service';
@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {

  @Input()
  public book!: IBook;

  public constructor(
    private readonly _cartService: CartService,
  ) { }

  public ngOnInit(): void {
    if (this.book) {
      this._cartService.markItem(this.book);
    }
  }

  public toogleToCart(book: IBook): void {
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
