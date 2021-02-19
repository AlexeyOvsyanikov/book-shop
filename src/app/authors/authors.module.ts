import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsListItemComponent } from './components/authors-list-item/authors-list-item.component';
import { AuthorPageComponent } from './components/author-page/author-page.component';
import { AuthorsListContainer } from './containers/authors-list/authors-list.container';
import { AuthorsView } from './views/authors/authors.view';
import { AuthorContainer } from './containers/author/author.container';
import { AuthorEditOrCreateContainer } from './containers/author-edit-or-create/author-edit-or-create.container';
import { AuthorEditOrCreateComponent } from './components/author-edit-or-create/author-edit-or-create.component';

import { PaginatorModule } from '@libs/paginator';
import { BookModule } from '@libs/book';

@NgModule({
  declarations: [
    AuthorsView,

    AuthorEditOrCreateContainer,
    AuthorsListContainer,
    AuthorContainer,

    AuthorsListItemComponent,
    AuthorPageComponent,
    AuthorEditOrCreateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    AuthorsRoutingModule,

    BookModule,
    PaginatorModule,

    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,

  ],
})
export class AuthorsModule { }
