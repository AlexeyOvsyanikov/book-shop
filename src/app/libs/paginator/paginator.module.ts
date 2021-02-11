import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';

import { PaginatorComponent } from './components/paginator/paginator.component';


@NgModule({
  declarations: [
    PaginatorComponent,
  ],
  imports: [
    CommonModule,

    MatPaginatorModule,
  ],
  exports:[
    PaginatorComponent,
  ]
})
export class PaginatorModule { }
