import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { IBook } from '@app/books';
import { ICart , ICartitem } from '@app/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private _items: ICartitem[] = [];
  private _total = 0;

  private readonly _items$ = new BehaviorSubject<ICartitem[]>([]);
  private readonly _length$ = new BehaviorSubject<number>(0);
  private readonly _total$ = new BehaviorSubject<number>(0);

  private readonly _bookAdded$ = new BehaviorSubject<number>(-1);
  private readonly _bookRemoved$ = new BehaviorSubject<number>(-1);

  constructor() {
    this._load();
  }

  public get total(): number {
    return this._total;
  }

  public get length(): number {
    return this._items.length;
  }

  public get items$(): Observable<ICartitem[]> {
    return this._items$.asObservable();
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

    this._set('cart', { items: this._items , total: this._total });

    this._bookAdded$.next(item.id);
  }

  public remove(id: number): void {
    const itemIndex = this._items.findIndex((i) => i.id === id);

    if (itemIndex !== -1) {
      this._items.splice(itemIndex, 1);

      this._bookRemoved$.next(id);
      this._items$.next(this._items);

      this._set('cart', { items: this._items , total: this._total });
    }
  }

  public increase(item: ICartitem): void {
    item.amount++;
    this._set('cart', { items: this._items , total: this._total });
  }

  public decrease(item: ICartitem): void {
    if (item.amount === 1) {
      return ;
    }

    item.amount--;
    this._set('cart', { items: this._items , total: this._total });
  }

  public changeAmount(id: number , amount: number): void {
    const item = this._items.find((i) => i.id === id);

    if (item && amount > 0) {
      item.amount = amount;
    } else if (item) {
      item.amount = 1;
    }

    this._set('cart', { items: this._items , total: this._total });
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

  private _get(key: string): string {
    return localStorage.getItem(key) ?? '';
  }

  private _set(key: string , cart: ICart): void {
    this._reloadTotal();

    const itemsForSerialize = cart.items.map(({ price , title , image , ...item }) => item);

    localStorage.setItem(key, JSON.stringify({ items: itemsForSerialize , total: this._total }));
    this._updateTotalAndLengthStreams();
  }

  private _load(): void {
    const cartJSON = this._get('cart');

    if (cartJSON) {
      const cart: ICart = JSON.parse(cartJSON);
      this._items = cart.items ?? [];
      this._total = cart.total ?? 0;
    } else {
      this._set('cart', { items: this._items , total: this._total });
    }
  }

  private _updateTotalAndLengthStreams(): void {
    this._length$.next(this._items.length);
    this._total$.next(this._total);
  }

}
