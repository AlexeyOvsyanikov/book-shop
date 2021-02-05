import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CartService } from '@app/cart';
import { IMeta , IApiResponse } from '@app/core';

import { BooksService } from '../../services/books/books.service';
import { IBook } from '../../interface/book.interface';

@UntilDestroy()
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

  public books!: IBook[];
  public meta!: IMeta;

  public pageSizeOptions = [5, 10];

  public isBooksLoaded = false;

  constructor(
    private readonly _booksService: BooksService,
    private readonly _cartService: CartService,
  ) { }

  public ngOnInit(): void {
    this._loadBooks()
      .pipe(
        tap(() => this.isBooksLoaded = true),
      )
      .subscribe();
  }

  public pageChanged(pageEvent: PageEvent): void {
    this._loadBooks(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .subscribe();
  }

  private _loadBooks(page = 1 , limit = 10): Observable<IApiResponse> {
    return this._booksService.getBooks(page, limit)
      .pipe(
        tap((response) => {
          this.books = response.books || [];
          this.meta = response.meta;
          this._cartService.initBooks(this.books);
        }),
        untilDestroyed(this),
      );
  }

}
