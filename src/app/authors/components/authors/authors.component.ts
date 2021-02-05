import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IMeta , IApiResponse } from '@app/core';
import { AuthorsService , IAuthor } from '@app/authors';

@UntilDestroy()
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {

  public authors!: IAuthor[];
  public meta!: IMeta;

  public pageSizeOptions = [5, 10];

  public isAuthorsLoaded = false;

  constructor(
    private readonly _authorsService: AuthorsService,
  ) { }

  public ngOnInit(): void {
    this._loadAuthors()
      .pipe(
        tap(() => this.isAuthorsLoaded = true),
      )
      .subscribe();
  }

  public pageChanged(pageEvent: PageEvent): void {
    this._loadAuthors(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .subscribe();
  }

  private _loadAuthors(page = 1 , limit = 10): Observable<IApiResponse> {
    return this._authorsService.getAuthors(page , limit)
      .pipe(
        tap((response) => {
          this.authors = response.authors || [];
          this.meta = response.meta;
        }),
        untilDestroyed(this),
      );
  }

}
