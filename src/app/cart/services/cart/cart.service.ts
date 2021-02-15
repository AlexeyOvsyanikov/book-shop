import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { IBook } from '@app/books';
import { ICart , ICartitem } from '@app/cart';

import { IJSONDataService } from './json.data.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly _prefix = 'cart';
  private _items: ICartitem[] = [];
  private _total = 0;

  private readonly _length$ = new BehaviorSubject<number>(0);
  private readonly _total$ = new BehaviorSubject<number>(0);

  private readonly _bookAdded$ = new BehaviorSubject<number>(-1);
  private readonly _bookRemoved$ = new BehaviorSubject<number>(-1);

  constructor(
    private readonly _dataService: IJSONDataService<ICart>,
  ) {
    this._load();
  }

  public get total(): number {
    return this._total;
  }

  public get length(): number {
    return this._items.length;
  }

  public get items(): ICartitem[] {
    return this._items;
  }

  public get length$(): Observable<number> {
    return this._length$.asObservable();
  }

  public get total$(): Observable<number> {
    return this._total$.asObservable();
  }

  public get bookAdded$(): Observable<number> {
    return this._bookAdded$.asObservable();
  }

  public get bookRemoved$(): Observable<number> {
    return this._bookRemoved$.asObservable();
  }

  public add(item: ICartitem): void {
    const checkItem = this._items.find((b) => b.id === item.id);

    if (checkItem) {
      return;
    }

    this._items.push(item);

    this._reloadTotal();

    this._emitBookAdded(item.id);

    this._save();
  }

  public remove(id: number): void {
    const itemIndex = this._items.findIndex((i) => i.id === id);

    if (itemIndex === -1) {
      return ;
    }

    this._items.splice(itemIndex, 1);

    this._reloadTotal();

    this._emitBookRemoved(id);

    this._save();
  }

  public increase(item: ICartitem): void {
    item.amount++;
    this.changeAmount(item.id , item.amount);
  }

  public decrease(item: ICartitem): void {
    if (item.amount === 1) {
      return ;
    }

    item.amount--;
    this.changeAmount(item.id , item.amount);
  }

  public changeAmount(id: number , amount: number): void {
    const item = this._items.find((i) => i.id === id);

    if (!item) {
      return ;
    }

    item.amount = Number(amount);

    if (!item.amount || item.amount < 1) {
      item.amount = 1;
    }

    this._reloadTotal();

    this._emitTotalAndLengthChanged();

    this._save();
  }


  public check(book: IBook): boolean {
    const bookIndex = this._items.findIndex((b) => b.id === book.id);

    return bookIndex !== -1;
  }

  private _reloadTotal(): void {
    this._total = this._items
      .map((i) => {
        return i.price ? i.amount * i.price : 0;
      })
      .reduce((acc , current) => acc + current , 0);
  }

  private _load(): void {
    const cart = this._dataService.get(this._prefix);

    if (cart) {
      this._items = cart.items ?? [];
      this._total = cart.total ?? 0;

      this._emitTotalAndLengthChanged();
    } else {
      this._save();
    }
  }

  private _save(): void {
    const items = this._items.map(({ price , title , image , ...item }) => item);

    this._dataService.set(this._prefix, { items , total: this._total });
  }

  private _emitBookAdded(id: number): void {
    this._bookAdded$.next(id);
    this._total$.next(this._total);
    this._length$.next(this._items.length);
  }

  private _emitBookRemoved(id: number): void {
    this._bookRemoved$.next(id);
    this._total$.next(this._total);
    this._length$.next(this._items.length);
  }

  private _emitTotalAndLengthChanged(): void {
    this._length$.next(this._items.length);
    this._total$.next(this._total);
  }

}
