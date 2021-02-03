import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { CartService } from '@app/cart/services/cart/cart.service';
import { ICartitem } from '@app/cart/interface/cart.item.interface';
import { ICart } from '@app/cart/interface/cart.interface';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  public cart: ICart;
  public itemsSource!: MatTableDataSource<ICartitem>;

  public displayedColumns = ['image', 'title', 'price', 'itemTotal', 'amount'];

  public constructor(
    private readonly _cartService: CartService,
  ) {
    this.cart = this._cartService.cart;
    this.itemsSource = new MatTableDataSource<ICartitem>(this.cart.cartItems);
  }

  public ngOnInit(): void {
  }

  public updateAmount(up: boolean , item: ICartitem): void {
    item.amount = up ? item.amount + 1 : item.amount - 1;
    this._cartService.updateItemAmount(up, item);
    if (item.amount === 0) {
      if (confirm('Are you shure to remove item?')) {
        this._cartService.removeFromCart(item.id);
        this.itemsSource = new MatTableDataSource<ICartitem>(this.cart.cartItems);
      } else {
        item.amount = 1;
      }
    }
  }

}
