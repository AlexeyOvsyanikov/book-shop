import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsComponent } from './components/authors/authors.component';
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [AuthorsComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatPaginatorModule
  ]
})
export class AuthorsModule { }
