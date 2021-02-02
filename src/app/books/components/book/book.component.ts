import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BooksService } from '../../services/books/books.service';
import { IBook } from '../../interface/book.interface';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book!: IBook;

  constructor(
    private bookService: BooksService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( params => of(params.id)),
        switchMap( id => this.bookService.getBook(id) ),
        untilDestroyed(this)
      ).subscribe( book => this.book = book );
  }

}
