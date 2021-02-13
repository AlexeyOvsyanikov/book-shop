import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmDialogService } from '@common';

import { BooksService } from '@app/books/services/books/books.service';

import { CartService } from '../../services/cart/cart.service';
import { ICartitem } from '../../interface/cart.item.interface';

import { CartItemsDataSource } from './../../services/cart/cart.items.data.source';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  public itemsSource!: CartItemsDataSource;

  public readonly displayedColumns = [
    'image',
    'title',
    'price',
    'itemTotal',
    'amount',
    'remove',
  ];
  public readonly displayedFooterColumns = [
    'first',
    'second',
    'trird',
    'fourth',
    'fifth',
    'sixth',
  ];

  public cart: ICartitem[] = [];

  constructor(
    private readonly _cartService: CartService,
    private readonly _booksService: BooksService,
    private readonly _confirmDialogService: ConfirmDialogService,
  ) {
    this.cart = this._cartService.items;

    this.itemsSource = new CartItemsDataSource(
      this._booksService,
      this._cartService,
    );
    this.itemsSource.load();
  }

  public get total$(): Observable<number> {
    return this._cartService.total$;
  }

  public ngOnInit(): void {}

  public remove(item: ICartitem): void {
    this._confirmDialogService
      .open(`Are you shure to remove "${item.title}" from cart?`)
      .pipe(
        filter((result) => !!result),
        tap(() => {
          this._cartService.remove(item.id);
          this.itemsSource.update();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  public increaseAmount(item: ICartitem): void {
    this._cartService.increase(item);
  }

  public decreaseAmount(item: ICartitem): void {
    this._cartService.decrease(item);
  }

  public amountChanged(id: number, amount: number): void {
    this._cartService.changeAmount(id, amount);
  }

}
