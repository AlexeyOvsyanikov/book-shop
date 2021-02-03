import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { BooksService } from '@app/books/services/books/books.service';
import { IBook } from '@app/books/interface/book.interface';

import { switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  public book!: IBook;

  public constructor(
    private _bookService: BooksService,
    private _activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap( params => this._bookService.getBook(params.id)),
        untilDestroyed(this)
      ).subscribe( book => this.book = book );
  }

}
