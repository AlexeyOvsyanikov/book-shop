import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { BookCardComponent } from './components/book-card/book-card.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    MatButtonModule,
  ],
  declarations: [
    BookCardComponent,
  ],
  exports: [
    BookCardComponent,
  ],
})
export class BookModule { }
