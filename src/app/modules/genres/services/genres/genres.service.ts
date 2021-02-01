import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../common/entity/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private readonly _API_GENRES_URL = 'genres';

  public constructor(
    private http: HttpClient
  ) { }

  public getGenres(page = 1 , limit = 10): Observable<ApiResponse>{

    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this.http.get(`${environment.API_URL}${this._API_GENRES_URL}` , {
      params
    }) as Observable<ApiResponse>;
  }

}
