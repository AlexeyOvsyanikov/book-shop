import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';

import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorComponent } from './components/author/author.component';
import { AuthorsRoutingModule } from './authors-routing.module';

import { PaginatorModule } from '@libs/paginator';
import { BookModule } from '@libs/book';

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    AuthorsRoutingModule,

    BookModule,
    PaginatorModule,

    MatListModule,

  ],
})
export class AuthorsModule { }
