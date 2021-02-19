import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { tap, filter, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IMeta, DEFAULT_PAGE, DEFAULT_ITEMS_LIMIT, ConfirmDialogService } from '@common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IAuthor } from '../../interface/author.interface';
import { AuthorsService } from '../../services/authors/authors.service';
import { IAuthorApiResponse } from '../../interface/api.response.interface';

@UntilDestroy()
@Component({
  selector: 'app-authors-list-container',
  templateUrl: './authors-list.container.html',
  styleUrls: ['./authors-list.container.scss'],
})
export class AuthorsListContainer implements OnInit {

  public authors!: IAuthor[];
  public meta!: IMeta;

  public isAuthorsLoaded = false;

  constructor(
    private readonly _router: Router,
    private readonly _authorsService: AuthorsService,
    private readonly _confirmDialogService: ConfirmDialogService,

    @Inject(DEFAULT_PAGE)
    private readonly _defaultPage: number,

    @Inject(DEFAULT_ITEMS_LIMIT)
    private readonly _defaultItemsLimit: number,
  ) { }

  public ngOnInit(): void {
    this._loadAuthors(this._defaultPage, this._defaultItemsLimit)
      .pipe(
        tap(() => this.isAuthorsLoaded = true),
      )
      .subscribe();
  }

  public paginatorPropsChanged(meta: IMeta): void {
    this._loadAuthors(meta.page , meta.limit)
      .subscribe();
  }

  public delete(author: IAuthor , index: number): void {
    const authorFirstLastName = `${author.first_name} ${author.last_name}`;
    const id = author.id;

    this._confirmDialogService
      .open(`Are you sure to remove "${authorFirstLastName}" ?`)
      .pipe(
        filter((result) => result),
        mergeMap((result) => this._authorsService.delete(id)),
        tap(() => {
          this.authors.splice(index , 1);
          this.meta.records--;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  private _loadAuthors(page: number, limit: number): Observable<IAuthorApiResponse> {
    return this._authorsService.list(page , limit)
      .pipe(
        tap((response) => {
          this.authors = response.authors || [];
          this.meta = response.meta;
        }),
        untilDestroyed(this),
      );
  }

}
