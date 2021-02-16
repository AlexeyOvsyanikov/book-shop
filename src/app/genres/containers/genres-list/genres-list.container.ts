import { Component, OnInit, Inject } from '@angular/core';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IMeta, DEFAULT_PAGE, DEFAULT_ITEMS_LIMIT } from '@common';
import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';

import { GenresService } from '../../services/genres/genres.service';
import { IGenre } from '../../interface/genre.interface';
import { IGenresApiResponse } from '../../interface/api.response.interface';

@UntilDestroy()
@Component({
  selector: 'app-genres-list-container',
  templateUrl: './genres-list.container.html',
  styleUrls: ['./genres-list.container.scss'],
})
export class GenresListContainer implements OnInit {

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
