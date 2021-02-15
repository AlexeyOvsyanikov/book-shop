import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmDialogService } from '@common';

import { CartService } from '@app/cart';

import { BooksService } from '../../services/books/books.service';
import { IBook } from '../../interface/book.interface';


@UntilDestroy()
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {

  public book!: IBook;
  public isInCart = false;

  constructor(
    private readonly _booksService: BooksService,
    private readonly _cartService: CartService,
    private readonly _confirmDialogService: ConfirmDialogService,
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._initBook();
  }

  public toggleToCart(): void {
    if (!this.isInCart) {
      this._cartService.add({
        id: this.book.id,
        amount: 1,
        price: this.book.price,
      });

      this.isInCart = true;
    } else {
      this._confirmDialogService.open(`Are you shure to remove "${this.book.title}" from cart?`)
        .pipe(
          tap((result) => {
            if (result) {
              this._cartService.remove(this.book.id);
            }
          }),
          untilDestroyed(this),
        )
        .subscribe();
    }
  }

  private _subscribeOnBookRemove(): void {
    this._cartService.bookRemoved$
      .pipe(
        tap((id) => {
          if (id === this.book.id) {
            this.isInCart = false;
          }
        }),
        untilDestroyed(this),
      ).subscribe();
  }

  private _initBook(): void {
    this._booksService.get(this._activatedRoute.snapshot.params.id)
      .pipe(
        tap((book) => {
          this.book = book;
          this.isInCart = this._cartService.check(this.book);

          this._subscribeOnBookRemove();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

}
