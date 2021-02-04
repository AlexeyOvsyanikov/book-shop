import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BooksService } from '@app/books/services/books/books.service';
import { CartService } from '@app/cart/services/cart/cart.service';
import { ICartitem } from '@app/cart/interface/cart.item.interface';
import { ICart } from '@app/cart/interface/cart.interface';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  public cart: ICart;
  public cartItems!: ICartitem[];

  public itemsSource!: MatTableDataSource<ICartitem>;

  public displayedColumns = ['image', 'title', 'price', 'itemTotal', 'amount' , 'remove'];
  public displayedFooterColumns = ['first', 'second', 'trird', 'fourth', 'fifth' , 'sixth'];

  public constructor(
    private readonly _cartService: CartService,
    private readonly _booksService: BooksService,
  ) {
    this.cart = this._cartService.cart;

    if (this.cart.cartItems.length !== 0) {
      this._createCartWithFullItemsStruct();
    }
  }

  public ngOnInit(): void {
  }

  public updateAmount(up: boolean , item: ICartitem): void {
    this._cartService.updateItemAmount(up, item);
    if (item.amount === 0) {
      if (this.remove(item.id)) {
        this._cartService.removeFromCart(item.id);
      } else {
        item.amount = 1;
      }
    }
  }

  public inputAmount(item: ICartitem): void {
    const amount = Number(item.amount);

    if (amount && amount > 0) {
      this._cartService.changeAmount(amount, item.id);
    } else {
      this._cartService.changeAmount(1, item.id);
      item.amount = 1;
    }
  }

  public remove(id: number): boolean {
    if (confirm('Are you shure to remove item?')) {
      this._cartService.removeFromCart(id);
      const itemIndex = this.cartItems.findIndex((b) => b.id === id);

      if (itemIndex !== -1) {
        this.cartItems.splice(itemIndex , 1);
        this.itemsSource = new MatTableDataSource<ICartitem>(this.cartItems);
      }

      return true;
    }

    return false;
  }

  private _createCartWithFullItemsStruct(): void {
    this.cartItems = this.cart.cartItems.map((i) => ({ ...i }));

    const ids = this.cart.cartItems.map((item) => item.id);
    this._booksService.getBooksByIds(ids)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((response) => {
        const books = response.books;
        books?.forEach((book) => {
          const item = this.cartItems.find((i) => i.id === book.id);
          if (item) {
            item.title = book.title;
            item.image = item.image || 'https://pngicon.ru/file/uploads/Book3.png';
          }
        });
        this.itemsSource = new MatTableDataSource<ICartitem>(this.cartItems);
      });
  }

}
