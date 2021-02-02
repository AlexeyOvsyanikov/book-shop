import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';
import { BookCartComponent } from './components/books/book-cart/book-cart.component';

@NgModule({
  declarations: [
    BooksComponent,
    BookComponent,
    BookCartComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class BookModule { }
