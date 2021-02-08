import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from '../../app-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { BookShopComponent } from './components/book-shop/book-shop.component';
@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    BookShopComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,

    RouterModule,
    AppRoutingModule,

    MatToolbarModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatDialogModule,

  ],
  exports: [
    HeaderComponent,
    ContentComponent,
    BookShopComponent,
  ],
})
export class LayoutModule { }
