import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from "@angular/router";

import { GenresComponent } from './components/genres/genres.component';

const routes: Routes = [
  {
    path: '',
    component: GenresComponent
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
