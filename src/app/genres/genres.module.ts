import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GenresComponent } from './components/genres/genres.component';
import { GenreComponent } from './components/genre/genre.component';

import { BookModule } from '@libs/book/book.module';

@NgModule({
  declarations: [
    GenresComponent,
    GenreComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatPaginatorModule,
    BookModule,
  ],
})
export class GenresModule { }
