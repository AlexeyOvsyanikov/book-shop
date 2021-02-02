import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../common/interface/api.response.interface';
import { IBook } from '../../interface/book.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly _apiBooksUrl = 'books';

  public constructor(
    private _http: HttpClient
  ) { }

  public getBooks(page = 1 , limit = 10): Observable<IApiResponse>{

    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this._http.get<IApiResponse>(
      `${environment.API_URL}${this._apiBooksUrl}`,
      {
        params
      }
    );
  }

  public getBook(id: number): Observable<IBook>{
    return this._http.get<IBook>(`${environment.API_URL}${this._apiBooksUrl}/${id}`);
  }

}
