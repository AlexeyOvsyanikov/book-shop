import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../../../interface/book.interface';

@Component({
  selector: 'app-book-cart',
  templateUrl: './book-cart.component.html',
  styleUrls: ['./book-cart.component.scss']
})
export class BookCartComponent implements OnInit {

  @Input() book!: IBook;

  public constructor() { }

  public ngOnInit(): void {
  }

}
