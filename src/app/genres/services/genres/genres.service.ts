import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IApiResponse } from '@app/core';
import { IGenre } from '@app/genres';

@Injectable({
  providedIn: 'root',
})
export class GenresService {

  private readonly _apiGenresUrl = 'genres';

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getGenres(page = 1 , limit = 10): Observable<IApiResponse> {
    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this._http.get<IApiResponse>(`/api/${this._apiGenresUrl}` , {
      params,
    });
  }

  public getGenre(id: number): Observable<IGenre> {
    return this._http.get<IGenre>(`/api/${this._apiGenresUrl}/${id}`);
  }

}
