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

import { AppRoutingModule } from '@app/app-routing.module';
import { GenresRoutingModuleModule } from '@app/genres/genres-routing-module.module';
import { AuthorsRoutingModuleModule } from '@app/authors/authors-routing-module.module';
import { BooksRoutingModuleModule } from '@app/books/books-routing-module.module';
import { AuthorsModule } from '@app/authors/authors.module';
import { GenresModule } from '@app/genres/genres.module';
import { BooksModule } from '@app/books/books.module';
import { CartModule } from '@app/cart/cart.module';

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
    GenresRoutingModuleModule,
    AuthorsRoutingModuleModule,
    BooksRoutingModuleModule,

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
