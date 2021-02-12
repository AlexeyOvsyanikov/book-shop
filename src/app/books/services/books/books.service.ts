import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IBook } from '../../interface/book.interface';
import { IBooksApiResponse } from '../../interface/api.response.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {

  private readonly _apiBooksUrl = 'books';

  public get defaultImageUrl(): string {
    return 'https://pngicon.ru/file/uploads/Book3.png';
  }
  constructor(
    private readonly _http: HttpClient,
  ) { }

  public list(page: number = 1 , limit: number = 10): Observable<IBooksApiResponse> {
    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this._http.get<IBooksApiResponse>(
      this._apiBooksUrl,
      {
        params,
      },
    );
  }

  public get(id: number): Observable<IBook> {
    return this._http.get<IBook>(`${this._apiBooksUrl}/${id}`);
  }

  public listByIds(ids: number[]): Observable<IBooksApiResponse> {
    let params = new HttpParams();
    ids.forEach((id) => params = params.append('q[id_in][]', String(id))) ;

    return this._http.get<IBooksApiResponse>(
      `${this._apiBooksUrl}`,
      {
        params,
      },
    );
  }

}
