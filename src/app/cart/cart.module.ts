import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmComponent } from '@common';

import { InputAmountAccessorComponent } from './components/input-amount-accessor/input-amount-accessor.component';
import { InputAmountComponent } from './components/input-amount/input-amount.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    CartComponent,
    InputAmountComponent,
    InputAmountAccessorComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,

    CartRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,

  ],
})
export class CartModule { }
