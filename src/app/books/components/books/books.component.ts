import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IMeta } from '@shared/interfaces/meta.interface';

import { BooksService } from '@app/books/services/books/books.service';
import { IBook } from '@app/books/interface/book.interface';

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

  public bookLoaded = false;

  public constructor(
    private readonly _booksService: BooksService,
  ) { }

  public ngOnInit(): void {
    this._booksService.getBooks()
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((response) => {
        this.books = response.books || [];
        this.meta = response.meta;
        this.bookLoaded = true;
      });
  }

  public pageChanged(pageEvent: PageEvent): void {
    this._booksService.getBooks(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((response) => {
        this.books = response.books || [];
        this.meta = response.meta;
      });
  }

}
