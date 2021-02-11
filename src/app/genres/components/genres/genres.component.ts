import { Component, OnInit , Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IMeta } from '@app/common/interface/api.response.meta.interface';
import { DEFAULT_PAGE , DEFAULT_ITEMS_LIMIT } from '@app/common/constants/paginator';

import { GenresService } from '../../services/genres/genres.service';
import { IGenre } from '../../interface/genre.interface';

import { IGenresApiResponse } from './../../interface/api.response.interface';
@UntilDestroy()
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
  providers: [
    GenresService,
  ],
})
export class GenresComponent implements OnInit {

  public genres!: IGenre[];
  public meta!: IMeta;

  public isGenresLoaded = false;

  constructor(
    private readonly _genresService: GenresService,

    @Inject(DEFAULT_PAGE)
    private readonly _defaultPage: number,

    @Inject(DEFAULT_ITEMS_LIMIT)
    private readonly _defaultItemsLimit: number,

  ) { }

  public ngOnInit(): void {
    this._loadGenres(this._defaultPage , this._defaultItemsLimit)
      .pipe(
        tap(() => this.isGenresLoaded = true),
      )
      .subscribe();
  }

  public pageChanged(meta: IMeta): void {
    this._loadGenres(meta.page, meta.limit)
      .subscribe();
  }

  private _loadGenres(page: number , limit: number): Observable<IGenresApiResponse> {
    return this._genresService.list(page, limit)
      .pipe(
        tap((response) => {
          this.genres = response.genres || [];
          this.meta = response.meta;
        }),
        untilDestroyed(this),
      );
  }

}
