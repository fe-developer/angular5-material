import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favourites = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.favourites = this.getSaved();
  }

  getSaved() {
    let favouriteMovies = [];

    if (localStorage.getItem('favouriteMovies')) {
      try {
        favouriteMovies = JSON.parse(localStorage.getItem('favouriteMovies'));
      } catch (e) {}
    }

    return favouriteMovies;
  }

  goToMovie(id: string) {
    this.router.navigate([`movie/${id}`]);
  }

  removeFromFavourites(favourite: object) {
    let i;

    this.favourites.map((_favourite, index) => {
      if (_favourite['imdbID'] === favourite['imdbID']) {
        i = index;
        return;
      }
    });

    this.favourites.splice(i, 1);
    localStorage.setItem('favouriteMovies', JSON.stringify(this.favourites));
  }
}
