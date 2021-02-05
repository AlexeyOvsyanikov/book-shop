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

import { AuthorsModule } from '@app/authors';
import { GenresModule } from '@app/genres';
import { BooksModule } from '@app/books';
import { CartModule } from '@app/cart';

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

    BooksModule,
    GenresModule,
    AuthorsModule,
    CartModule,

    MatToolbarModule,
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
