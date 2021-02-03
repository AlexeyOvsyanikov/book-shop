import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from "@angular/router";

import { GenresComponent } from './components/genres/genres.component';
import { GenreComponent } from './components/genre/genre.component';

const routes: Routes = [
  {
    path: '',
    component: GenresComponent
  },
  {
    path: ':id',
    component: GenreComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GenresRoutingModuleModule { }
