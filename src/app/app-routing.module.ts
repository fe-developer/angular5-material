import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { FavouritesComponent } from "./favourites/favourites.component";
import { MovieComponent } from "./movie/movie.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  },
  {
    path: 'movie/:id',
    component: MovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
