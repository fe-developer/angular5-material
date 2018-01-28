import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  movies: Observable<any[]>;
  myControl = new FormControl();
  startValue = 'select';

  constructor(private _data: DataService, private router: Router) {
    this.movies = this.myControl.valueChanges
      .pipe(
        startWith(this.startValue),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          return this.getMovies(val || '');
        })
      );
  }

  ngOnInit() {
    this.myControl.setValue(this.startValue);
  }

  getMovies(s: string): Observable<any[]> {
    return this._data.getMovies(s)
      .pipe(
        map(response => {
          if (response && response['Response']) {
            console.log('response[\'Search\']', response['Search']);
            return response['Search'];
          }
          return [];
        })
      );
  }

  goToMovie(id: string) {
    this.router.navigate([`movie/${id}`]);
  }

  addToFavourite(movie: object) {
    let favouriteMovies = [];

    if (!localStorage.getItem('favouriteMovies')) {
      favouriteMovies.push(movie);
    } else {
      try {
        favouriteMovies = JSON.parse(localStorage.getItem('favouriteMovies'));
      } catch(e) {
        favouriteMovies = [];
      }

      if (!favouriteMovies.find(_movie => _movie['imdbID'] === movie['imdbID'])) {
        favouriteMovies.push(movie);
      } else {
        let i;

        favouriteMovies.map((_movie, index) => {
          if (_movie['imdbID'] === movie['imdbID']) {
            i = index;
            return;
          }
        });

        favouriteMovies.splice(i, 1);
      }
    }

    localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));

    console.log('localStorage', JSON.parse(localStorage.getItem('favouriteMovies')));
  }

  isFavourite(movie) {
    let favouriteMovies;

    try {
      favouriteMovies = JSON.parse(localStorage.getItem('favouriteMovies'));
    } catch(e) {
      favouriteMovies = [];
    }

    if (favouriteMovies.find(_movie => _movie['imdbID'] === movie['imdbID'])) {
      return true;
    }

    return false;
  }
}
