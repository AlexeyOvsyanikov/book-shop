import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';

import { BookModule } from '@libs/book/book.module';


@NgModule({
  declarations: [
    BooksComponent,
    BookComponent,
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
    BookModule,
  ],
})
export class BooksModule { }
