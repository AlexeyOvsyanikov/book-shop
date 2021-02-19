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

  public list(page: number = 1 , limit: number = 10): Observable<IAuthorApiResponse> {
    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this._http
      .get<IAuthorApiResponse>(
        this._apiAuthorsUrl,
      {
        params,
      });
  }

  public get(id: number): Observable<IAuthor> {
    return this._http.get<IAuthor>(`${this._apiAuthorsUrl}/${id}`);
  }

  public update(author: IAuthor): Observable<IAuthor> {
    return this._http.put<IAuthor>(
      `${this._apiAuthorsUrl}/${author.id}`,
      {
        first_name: author.first_name,
        last_name: author.last_name,
      },
    );
  }

  public delete(id: number): Observable<IAuthor> {
    return this._http.delete<IAuthor>(`${this._apiAuthorsUrl}/${id}`);
  }

  public create(author: IAuthor): Observable<IAuthor> {
    return this._http.post<IAuthor>(`${this._apiAuthorsUrl}`, {
      first_name: author.first_name,
      last_name: author.last_name,
    });
  }

}
