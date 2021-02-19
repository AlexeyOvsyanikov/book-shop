import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '@app/common/guards/can-deactivate.guard';
import { GenreCreateComponent } from '@app/genres/components/genre-create/genre-create.component';

import { GenresListContainer } from './containers/genres-list/genres-list.container';
import { GenreContainer } from './containers/genre/genre.container';
import { GenresView } from './views/genres/genres.view';

const routes: Routes = [
  {
    path: '',
    component: GenresView,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: GenresListContainer,
      },
      {
        path: 'details/:id',
        component: GenreContainer,
      },
      {
        path: 'create',
        component: GenreCreateComponent,
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
export class GenresRoutingModule { }
