import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';

import { Observable, BehaviorSubject } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';

import { BooksService, IBook } from '@app/books';

import { CartService } from './cart.service';
import { ICartItem } from './../../interface/cart.item.interface';

@UntilDestroy()
export class CartItemsDataSource implements DataSource<ICartItem> {

  private readonly _items$ = new BehaviorSubject<ICartItem[]>([]);
  private readonly _itemsLoading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly _booksService: BooksService,
    private readonly _cartService: CartService,
  ) {}

  public get items$(): Observable<ICartItem[]> {
    return this._items$.asObservable();
  }

  public get itemsLoading$(): Observable<boolean> {
    return this._itemsLoading$.asObservable();
  }

  public connect(
    collectionViewer: CollectionViewer,
  ): Observable<ICartItem[] | readonly ICartItem[]> {
    return this.items$;
  }

  public disconnect(collectionViewer: CollectionViewer): void {
    this._items$.complete();
    this._itemsLoading$.complete();
  }

  public load(limit: number): void {
    this._itemsLoading$.next(true);

    const ids = this._cartService.items.map((item) => item.id);

    this._booksService.listByIds(ids, limit)
      .pipe(
        pluck('books'),
        tap((books) => {
          this._transform(books);
          this._emitLoadingcomlete();
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  public update(): void {
    this._items$.next(this._cartService.items);
  }

  private _transform(books: IBook[]): void {
    books.forEach((book) => {
      const item = this._cartService.items.find((i) => i.id === book.id);

      if (item) {
        item.title = book.title;
        item.price = book.price;
        item.image = item.image || this._booksService.defaultImageUrl;
      }
    });
  }

  private _emitLoadingcomlete(): void {
    this._items$.next(this._cartService.items);
    this._itemsLoading$.next(false);
  }

}
