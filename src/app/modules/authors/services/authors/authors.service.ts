import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../common/interface/api.response.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private readonly _apiAuthorsUrl = 'authors';

  public constructor(
    private _http: HttpClient
  ) { }

  public getAuthors(page = 1 , limit = 10): Observable<IApiResponse>{
    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this._http
      .get<IApiResponse>(
        `${environment.API_URL}${this._apiAuthorsUrl}`,
        {
          params
        },
      );
  }
}
