import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { BookCardContainer } from './containers/book-card/book-card.container';
import { BookCardComponent } from './components/book-card.component';


@NgModule({
  declarations: [
    BookCardContainer,
    BookCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
  ],
  exports: [
    BookCardContainer,
    BookCardComponent,
  ],
})
export class BookModule { }
