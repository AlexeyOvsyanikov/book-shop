import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GenresComponent } from './components/genres-list-item/genres.component';
import { GenreComponent } from './components/genre/genre.component';
import { GenresRoutingModule } from './genres-routing.module';
import { GenresListContainer } from './containers/genres-list/genres-list.container';
import { GenresView } from './views/genres/genres.view';
import { GenreContainer } from './containers/genre/genre.container';

import { BookModule } from '@libs/book';
import { PaginatorModule } from '@libs/paginator';
import { MatButtonModule } from '@angular/material/button';
import { GenreCreateComponent } from './components/genre-create/genre-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GenresComponent,
    GenreComponent,

    GenresListContainer,
    GenreContainer,

    GenresView,

    GenreCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    GenresRoutingModule,
    BookModule,
    PaginatorModule,

    MatListModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class GenresModule { }
