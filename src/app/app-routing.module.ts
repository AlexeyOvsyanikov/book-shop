import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'genres',
    loadChildren: () => import('./modules/genres/genres-routing-module.module').then(m => m.GenresRoutingModuleModule)
  },
  {
    path: 'authors',
    loadChildren: () => import('./modules/authors/authors-routing-module.module').then(m => m.AuthorsRoutingModuleModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./modules/books/book-routing-module.module').then(m => m.BookRoutingModuleModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules/cart/cart-routing.module').then(m => m.CartRoutingModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
