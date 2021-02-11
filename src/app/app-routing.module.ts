import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full',
  },
  {
    path: 'genres',
    loadChildren: () => import('@app/genres').then((m) => m.GenresModule),
  },
  {
    path: 'authors',
    loadChildren: () => import('@app/authors').then((m) => m.AuthorsModule),
  },
  {
    path: 'books',
    loadChildren: () => import('@app/books').then((m) => m.BooksModule),
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
