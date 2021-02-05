import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorComponent } from './components/author/author.component';

import { BookModule } from '@libs/book';

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatPaginatorModule,
    BookModule,
  ],
})
export class AuthorsModule { }
