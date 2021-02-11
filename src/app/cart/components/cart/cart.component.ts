import {
  Component,
  OnInit ,
  ViewChildren ,
  AfterViewInit ,
  ElementRef ,
  QueryList,
} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { fromEvent, Observable } from 'rxjs';
import { debounceTime , pluck, tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
export class CartComponent implements OnInit, AfterViewInit {

  public itemsSource!: MatTableDataSource<ICartitem>;

  public readonly displayedColumns = ['image', 'title', 'price', 'itemTotal', 'amount' , 'remove'];
  public readonly displayedFooterColumns = ['first', 'second', 'trird', 'fourth', 'fifth' , 'sixth'];

  public cart: ICartitem[] = [];

  public readonly bookMap = new Map<number, IBook>();

  @ViewChildren('amount')
  private readonly _items!: QueryList<ElementRef>;

  constructor(
    private readonly _cartService: CartService,
    private readonly _booksService: BooksService,
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

  public ngAfterViewInit(): void {
    this._addEventListenersToAmountInputs();
  }

  public remove(id: number) : void {
    this._cartService.remove(id);
    this.itemsSource = new MatTableDataSource<ICartitem>(this.cart);
  }

  public increaseAmount(item: ICartitem): void {
    this._cartService.increase(item);
  }

  public decreaseAmount(item: ICartitem): void {
    this._cartService.decrease(item);
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

  private _addEventListenersToAmountInputs(): void {
    this._items.forEach((element: ElementRef<HTMLInputElement>) => {
      fromEvent<InputEvent>(element.nativeElement , 'input')
        .pipe(
          debounceTime(400),
          tap((e) => {
            const input = element.nativeElement;
            this._cartService.changeAmount(Number(input.id) , Number(input.value));
          }),
          untilDestroyed(this),
        )
        .subscribe();
    });
  }

}
