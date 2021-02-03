import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
  },
  {
    path: ':id',
    component: BookComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class BookRoutingModuleModule { }
