import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { GenresComponent } from './modules/genres/components/genres/genres.component';
import { AuthorsComponent } from './modules/authors/components/authors/authors.component';

const routes: Routes = [
  {
    path: 'genres',
    component: GenresComponent,
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
