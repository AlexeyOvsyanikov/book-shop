import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BooksService } from '@app/modules/books/services/books/books.service';
import { IMeta } from '@app/common/interface/meta.interface';
import { IBook } from '@app/modules/books/interface/book.interface';
@UntilDestroy()
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public books!: IBook[];
  public meta!: IMeta;

  public pageSizeOptions: number[] = [5, 10];

  public bookLoaded = false;

  public constructor(
    private booksService: BooksService
  ) { }

  public ngOnInit(): void {
    this.booksService.getBooks()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe( response => {
        this.books = response.books || [];
        this.meta = response.meta;
        this.bookLoaded = true;
      } );
  }

  public pageChanged(pageEvent: PageEvent): void {
    this.booksService.getBooks(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe( response => {
        this.books = response.books || [];
        this.meta = response.meta;
      });
  }
}
