import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IGenre } from '@app/genres';

import { IGenresApiResponse } from '../../interface/api.response.interface';

@Injectable({
  providedIn: 'root',
})
export class GenresService {

  private readonly _apiGenresUrl = 'genres';

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public list(page: number = 1 , limit: number = 10): Observable<IGenresApiResponse> {
    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this._http.get<IGenresApiResponse>(
      this._apiGenresUrl,
      {
        params,
      },
    );
  }

  public get(id: number): Observable<IGenre> {
    return this._http.get<IGenre>(`${this._apiGenresUrl}/${id}`);
  }

  public create(genre: IGenre): Observable<IGenre> {
    return this._http.post<IGenre>(
      this._apiGenresUrl,
      {
        name: genre.name,
      },
    );
  }
}
