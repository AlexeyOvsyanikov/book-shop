import { Component, Input, OnInit } from '@angular/core';

import { IBook } from '@app/modules/books/interface/book.interface';
import { CartService } from '@app/modules/cart/services/cart/cart.service';
@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.scss']
})
export class BookCartComponent implements OnInit {

  @Input()
  public book!: IBook;

  public constructor(
    private _cartService: CartService
  ) { }

  public ngOnInit(): void {
  }

  public toogleToCart(book: IBook){

    book.isInCart = !book.isInCart;

    if(book.isInCart){

      this._cartService.addToCart({
        id: book.id,
        amount: 1,
        price: book.price,
      });

    } else {
      this._cartService.removeFromCart(book.id);
    }

  }

}
