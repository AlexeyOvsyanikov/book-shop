import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/books', pathMatch: 'full',
  },
  {
    path: 'genres',
    loadChildren: () => import('@app/genres/genres-routing-module.module').then((m) => m.GenresRoutingModuleModule),
  },
  {
    path: 'authors',
    loadChildren: () => import('@app/authors/authors-routing-module.module').then((m) => m.AuthorsRoutingModuleModule),
  },
  {
    path: 'books',
    loadChildren: () => import('@app/books/books-routing-module.module').then((m) => m.BooksRoutingModuleModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
