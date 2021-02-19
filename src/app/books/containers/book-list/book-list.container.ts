import { Component, OnInit, Inject } from '@angular/core';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IMeta, DEFAULT_PAGE, DEFAULT_ITEMS_LIMIT } from '@common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BooksService } from '../../services/books/books.service';
import { IBook } from '../../interface/book.interface';
import { IBooksApiResponse } from '../../interface/api.response.interface';

@UntilDestroy()
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.container.html',
  styleUrls: ['./book-list.container.scss'],
})
export class BookListContainer implements OnInit {

  public books!: IBook[];
  public meta!: IMeta;

  public isBooksLoaded = false;

  constructor(
    @Inject(DEFAULT_PAGE)
    private readonly _defaultPage: number,

    @Inject(DEFAULT_ITEMS_LIMIT)
    private readonly _defaultItemsLimit: number,

    private readonly _booksService: BooksService,
  ) { }

  public ngOnInit(): void {
    this._loadBooks(this._defaultPage, this._defaultItemsLimit)
      .pipe(
        tap(() => this.isBooksLoaded = true),
      )
      .subscribe();
  }

  public paginatorPropsChanged(meta: IMeta): void {
    this._loadBooks(meta.page, meta.limit)
      .subscribe();
  }

  private _loadBooks(page: number, limit: number): Observable<IBooksApiResponse> {
    return this._booksService.list(page, limit)
      .pipe(
        tap((response) => {
          this.books = response.books || [];
          this.meta = response.meta;
        }),
        untilDestroyed(this),
      );
  }

}
