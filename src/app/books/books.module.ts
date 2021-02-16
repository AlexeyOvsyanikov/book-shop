import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { BookPageComponent } from './components/book-page/book-page.component';
import { BooksRoutingModule } from './books-routing.module';
import { BookListContainer } from './containers/book-list/book-list.container';
import { BooksView } from './views/books/books.view';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookContainer } from './containers/book/book.container';

import { PaginatorModule } from '@libs/paginator';
import { BookModule } from '@libs/book';

@NgModule({
  declarations: [
    BookListComponent,
    BookPageComponent,

    BookContainer,
    BookListContainer,
    BooksView,
  ],
  imports: [
    CommonModule,
    RouterModule,

    BooksRoutingModule,

    BookModule,
    PaginatorModule,

    MatListModule,
    MatButtonModule,

  ],
})
export class BooksModule { }
