import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BooksView } from './views/books/books.view';
import { BookListContainer } from './containers/book-list/book-list.container';
import { BookContainer } from './containers/book/book.container';

const routes: Routes = [
  {
    path: '',
    component: BooksView,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BookListContainer,
      },
      {
        path: 'details/:id',
        component: BookContainer,
      },
      {
        path: 'edit/:id',
        component: BookContainer,
      },
      {
        path: 'new',
        component: BookContainer,
      },
    ],
  },


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BooksRoutingModule { }
