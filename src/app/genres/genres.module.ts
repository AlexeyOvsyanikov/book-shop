import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GenresComponent } from './components/genres/genres.component';

@NgModule({
  declarations: [
    GenresComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatPaginatorModule
  ]
})
export class GenresModule { }
