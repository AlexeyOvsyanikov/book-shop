import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../common/entity/ApiResponse';
import { environment } from '../../../../environments/environment';
import { Book } from '../entity/Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly _API_BOOKS_URL = 'books';

  public constructor(
    private http: HttpClient
  ) { }

  public getBooks(page = 1 , limit = 10): Observable<ApiResponse>{

    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this.http.get(`${environment.API_URL}${this._API_BOOKS_URL}` , {
      params
    }) as Observable<ApiResponse>;
  }

  public getBook(id: number): Observable<Book>{
    return this.http.get(`${environment.API_URL}${this._API_BOOKS_URL}/${id}`) as Observable<Book>;
  }

}
