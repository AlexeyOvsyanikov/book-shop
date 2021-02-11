import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,

    CartRoutingModule,

    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
})
export class CartModule { }
