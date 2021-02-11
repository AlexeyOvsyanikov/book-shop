import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfirmDialogService } from '@common';

import { BooksService } from '@app/books/services/books/books.service';
import { IBook } from '@app/books';

import { CartService } from '../../services/cart/cart.service';
import { ICartitem } from '../../interface/cart.item.interface';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  public itemsSource!: MatTableDataSource<ICartitem>;

  public readonly displayedColumns = ['image', 'title', 'price', 'itemTotal', 'amount' , 'remove'];
  public readonly displayedFooterColumns = ['first', 'second', 'trird', 'fourth', 'fifth' , 'sixth'];

  public cart: ICartitem[] = [];

  public readonly bookMap = new Map<number, IBook>();

  constructor(
    private readonly _cartService: CartService,
    private readonly _booksService: BooksService,
    private readonly _confirmDialogService: ConfirmDialogService,
  ) {
    this.cart = this._cartService.items;

    this.itemsSource = new MatTableDataSource<ICartitem>(this.cart);

    this._createCartWithFullItemsStruct();
  }

  public get total$(): Observable<number> {
    return this._cartService.total$;
  }

  public ngOnInit(): void {
  }

  public remove(item: ICartitem) : void {
    this._confirmDialogService.open(`Are you shure to remove "${item.title}" from cart?`)
      .pipe(
        tap((result) => {
          if (result) {
            this._cartService.remove(item.id);
            this.itemsSource = new MatTableDataSource<ICartitem>(this.cart);
          }
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

  public amountChanged(id: number , amount: number): void {
    this._cartService.changeAmount(id , amount);
  }

  private _createCartWithFullItemsStruct(): void {
    const ids = this.cart.map((item) => item.id);

    this._booksService.listByIds(ids)
      .pipe(
        pluck('books'),
        tap((books) => {
          this._transformCartItems(books);
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  private _transformCartItems(books: IBook[]): void {
    books.forEach((book) => {
      const item = this.cart.find((i) => i.id === book.id);

      if (item) {
        item.title = book.title;
        item.price = book.price;
        item.image = item.image || this._booksService.defaultImageUrl;
      }
    });

    this.itemsSource = new MatTableDataSource<ICartitem>(this.cart);
  }

}
