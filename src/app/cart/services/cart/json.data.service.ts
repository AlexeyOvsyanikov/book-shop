import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class IJSONDataService<T> {


  public set(key: string , data: T): void {
    localStorage.setItem(key , JSON.stringify(data));
  }

  public get(key: string): T {
    const dataJSON = localStorage.getItem(key) ?? '{}';

    return JSON.parse(dataJSON);
  }

}
