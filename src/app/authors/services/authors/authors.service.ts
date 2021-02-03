import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '@app/core/interface/api.response.interface';
import { IAuthor } from '@app/authors/interface/author.interface';
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
        `/api/${this._apiAuthorsUrl}`,
        {
          params
        },
      );
  }

  public getAuthor(id: number): Observable<IAuthor>{
    return this._http.get<IAuthor>(`/api/${this._apiAuthorsUrl}/${id}`);
  }

}
