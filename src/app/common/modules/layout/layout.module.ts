import { CartModule } from './../../../modules/cart/cart.module';
import { AppRoutingModule } from '../../../app-routing.module';

import { GenresRoutingModuleModule } from './../../../modules/genres/genres-routing-module.module';
import { AuthorsRoutingModuleModule } from './../../../modules/authors/authors-routing-module.module';
import { BookRoutingModuleModule } from './../../../modules/books/book-routing-module.module';

import { AuthorsModule } from './../../../modules/authors/authors.module';
import { GenresModule } from './../../../modules/genres/genres.module';
import { BookModule } from './../../../modules/books/book.module';

import { RouterModule } from '@angular/router';

import { MatBadgeModule } from '@angular/material/badge';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { BookShopComponent } from './components/book-shop/book-shop.component';
@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    BookShopComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,

    RouterModule,
    AppRoutingModule,
    GenresRoutingModuleModule,
    AuthorsRoutingModuleModule,
    BookRoutingModuleModule,

    BookModule,
    GenresModule,
    AuthorsModule,
    CartModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,

  ],
  exports:[
    HeaderComponent,
    ContentComponent,
    BookShopComponent
  ]
})
export class LayoutModule { }
