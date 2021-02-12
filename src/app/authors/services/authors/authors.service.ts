import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IAuthorApiResponse } from '../../interface/api.response.interface';
import { IAuthor } from '../../interface/author.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {

  private readonly _apiAuthorsUrl = 'authors';

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public list(page = 1 , limit = 10): Observable<IAuthorApiResponse> {
    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this._http
      .get<IAuthorApiResponse>(
        this._apiAuthorsUrl,
      {
        params,
      },
      );
  }

  public get(id: number): Observable<IAuthor> {
    return this._http.get<IAuthor>(`${this._apiAuthorsUrl}/${id}`);
  }

}
