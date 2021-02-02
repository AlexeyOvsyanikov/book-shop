import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../../common/interface/api.response.interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  private readonly _apiGenresUrl = 'genres';

  public constructor(
    private _http: HttpClient
  ) { }

  public getGenres(page = 1 , limit = 10): Observable<IApiResponse>{

    const params = new HttpParams()
      .append('page' , String(page))
      .append('limit' , String(limit));

    return this._http.get<IApiResponse>(`${environment.API_URL}${this._apiGenresUrl}` , {
      params
    });
  }

}
