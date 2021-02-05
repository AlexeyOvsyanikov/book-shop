import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BooksService , IBook } from '@app/books';
import { CartService } from '@app/cart';

@UntilDestroy()
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  public book!: IBook;

  constructor(
    private readonly _bookService: BooksService,
    private readonly _cartService: CartService,
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._bookService.getBook(this._activatedRoute.snapshot.params.id)
      .pipe(untilDestroyed(this))
      .subscribe((book) => {
        this.book = book;
        this.book.isInCart = this._cartService.isInCart(this.book);
        this._cartService.initBooks([this.book]);
      });
  }

  public toggleToCart(book: IBook): void {
    book.isInCart = !book.isInCart;

    if (book.isInCart) {
      this._cartService.addToCart({
        id: book.id,
        amount: 1,
        price: book.price,
      }, book);
    } else {
      this._cartService.removeFromCart(book.id);
    }
  }

}
