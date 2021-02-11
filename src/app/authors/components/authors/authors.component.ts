
import { Component, OnInit , Inject} from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IMeta } from '@common/interface/api.response.meta.interface';

import { DEFAULT_PAGE , DEFAULT_ITEMS_LIMIT } from '@common/constants/paginator';

import { AuthorsService } from '../../services/authors/authors.service';
import { IAuthor } from '../../interface/author.interface';
import { IAuthorApiResponse } from '../../interface/api.response.interface';

@UntilDestroy()
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  providers: [
    AuthorsService,
  ],
})
export class AuthorsComponent implements OnInit {

  public authors!: IAuthor[];
  public meta!: IMeta;

  public isAuthorsLoaded = false;

  constructor(
    private readonly _authorsService: AuthorsService,

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
