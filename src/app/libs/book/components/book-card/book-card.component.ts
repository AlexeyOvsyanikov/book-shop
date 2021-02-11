import { Component, Input, OnInit } from '@angular/core';

import { tap } from 'rxjs/operators';

import { ConfirmDialogService } from '@common';
import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';

import { IBook } from '@app/books';
import { CartService } from '@app/cart';
@UntilDestroy()
@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {

  @Input()
  public book!: IBook;

  public isInCart = false;

  constructor(
    private readonly _cartService: CartService,
    private readonly _confirmDialogService: ConfirmDialogService,
  ) { }

  public ngOnInit(): void {
    if (this.book) {
      this.isInCart = this._cartService.check(this.book);
      this._subscribeOnBookRemove();
    }
  }

  public toggleToCart(book: IBook): void {
    if (!this.isInCart) {
      this._cartService.add({
        id: book.id,
        amount: 1,
        price: book.price,
      });

      this.isInCart = true;
    } else {
      this._confirmDialogService.open(`Are you shure to remove "${book.title}" from cart?`)
        .pipe(
          tap((result) => {
            if (result) {
              this._cartService.remove(book.id);
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
      )
      .subscribe();
  }

}
