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
