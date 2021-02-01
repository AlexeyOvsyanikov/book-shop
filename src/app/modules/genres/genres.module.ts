import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from './components/genres/genres.component';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [GenresComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatPaginatorModule
  ]
})
export class GenresModule { }
