import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IApiResponse } from '@app/shared/interfaces/api.response.interface';
import { IBook } from '@app/books/interface/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {

  private readonly _apiBooksUrl = 'books';

  public constructor(
    private readonly _http: HttpClient,
  ) { }

  public getBooks(page = 1 , limit = 10): Observable<IApiResponse> {
    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this._http.get<IApiResponse>(
      `/api/${this._apiBooksUrl}`,
      {
        params,
      },
    );
  }

  public getBook(id: number): Observable<IBook> {
    return this._http.get<IBook>(`/api/${this._apiBooksUrl}/${id}`);
  }

}
