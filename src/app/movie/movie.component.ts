import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from "../data.service";
import {isUndefined} from "util";
import { apiSettings } from "../settings.const";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  id: string;
  movie: object;
  loading = true;

  constructor(private route: ActivatedRoute, private _http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id = res.id;
      console.log(res.id);
    });

    const params = new HttpParams()
      .set('apikey', apiSettings.apiKey)
      .set('i', this.id);
    this._http.get(apiSettings.url, {params}).subscribe(
      data => {
        this.movie = data;
        this.loading = false;
        console.log('this.movie', this.movie);
      }
    );
  }
}
