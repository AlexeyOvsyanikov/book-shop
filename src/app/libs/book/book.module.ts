import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { BookCardComponent } from './components/book-card/book-card.component';


@NgModule({
  declarations: [
    BookCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
  ],
  exports: [
    BookCardComponent,
  ],
})
export class BookModule { }
