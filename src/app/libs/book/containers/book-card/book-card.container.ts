import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { tap, filter } from 'rxjs/operators';

import { ConfirmDialogService } from '@common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IBook } from '@app/books';
import { CartService, ICartItem } from '@app/cart';

@UntilDestroy()
@Component({
  selector: 'app-book-card-container',
  templateUrl: './book-card.container.html',
  styleUrls: ['./book-card.container.scss'],
})
export class BookCardContainer implements OnInit {

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
      const newCartItem: ICartItem = {
        id: book.id,
        amount: 1,
        price: book.price,
      };

      this._cartService.add(newCartItem);

      this.isInCart = true;
    } else {
      this._confirmDialogService.open(`Are you sure to remove "${book.title}" from cart?`)
        .pipe(
          filter((result) => result),
          tap((result) => {
            this._cartService.remove(book.id);
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
