import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GenresComponent } from './components/genres/genres.component';
import { GenreComponent } from './components/genre/genre.component';
import { GenresRoutingModule } from './genres-routing.module';

import { BookModule } from '@libs/book';
import { PaginatorModule } from '@libs/paginator';

@NgModule({
  declarations: [
    GenresComponent,
    GenreComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    GenresRoutingModule,
    BookModule,
    PaginatorModule,

    MatListModule,
    MatPaginatorModule,
  ],
})
export class GenresModule { }
