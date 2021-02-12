import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorComponent } from './components/author/author.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsComponent,
  },
  {
    path: ':id',
    component: AuthorComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthorsRoutingModule { }
