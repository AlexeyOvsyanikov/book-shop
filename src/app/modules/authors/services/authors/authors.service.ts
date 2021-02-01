import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../common/entity/ApiResponse';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private readonly _API_AUTHORS_URL = 'authors';

  public constructor(
    private http: HttpClient
  ) { }

  public getAuthors(page = 1 , limit = 10): Observable<ApiResponse>{
    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this.http.get(`${environment.API_URL}${this._API_AUTHORS_URL}` , {
      params
    }) as Observable<ApiResponse>;
  }
}
