import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthorsView } from '@app/authors/views/authors/authors.view';
import { CanDeactivateGuard } from '@app/common/guards/can-deactivate.guard';

import { AuthorEditOrCreateComponent } from './components/author-edit-or-create/author-edit-or-create.component';
import { AuthorsListContainer } from './containers/authors-list/authors-list.container';
import { AuthorContainer } from './containers/author/author.container';


const routes: Routes = [
  {
    path: '',
    component: AuthorsView,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AuthorsListContainer,
      },
      {
        path: 'details/:id',
        component: AuthorContainer,
      },
      {
        path: 'create',
        component: AuthorEditOrCreateComponent,
        data: {
          edit: false,
        },
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'edit/:id',
        component: AuthorEditOrCreateComponent,
        data: {
          edit: true,
        },
        canDeactivate: [CanDeactivateGuard],
      },
    ],
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
