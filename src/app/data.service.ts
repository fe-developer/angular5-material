import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { apiSettings } from "./settings.const";

@Injectable()
export class DataService {
  constructor(private _http: HttpClient) { }

  getMovies(val: string): Observable<any[]> {
    const params = new HttpParams()
      .set('apiKey', apiSettings.apiKey)
      .set('s', val);

    return this._http.get<any[]>(apiSettings.url, {params});
  }

  getMovie(id: string): Observable<any> {
    const params = new HttpParams()
      .set('apiKey', apiSettings.apiKey)
      .set('i', id);

    return this._http.get<any[]>(apiSettings.url, {params});
  }
}
