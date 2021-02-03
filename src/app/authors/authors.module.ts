import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AuthorsComponent } from './components/authors/authors.component';

@NgModule({
  declarations: [
    AuthorsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatPaginatorModule,
  ],
})
export class AuthorsModule { }
