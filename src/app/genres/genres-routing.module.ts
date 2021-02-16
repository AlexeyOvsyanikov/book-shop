import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GenresListContainer } from './containers/genres-list/genres-list.container';
import { GenreContainer } from './containers/genre/genre.container';

const routes: Routes = [
  {
    path: '',
    component: GenresListContainer,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: GenresListContainer,
      },
      {
        path: ':id',
        component: GenreContainer,
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
