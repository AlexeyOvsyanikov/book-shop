import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';
import { BooksRoutingModule } from './books-routing.module';

import { PaginatorModule } from '@libs/paginator';
import { BookModule } from '@libs/book';

@NgModule({
  declarations: [
    BooksComponent,
    BookComponent,
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
