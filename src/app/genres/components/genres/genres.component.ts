import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IApiResponse , IMeta } from '@app/core';

import { GenresService } from '../../services/genres/genres.service';
import { IGenre } from '../../interface/genre.interface';

@UntilDestroy()
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {

  public genres!: IGenre[];
  public meta!: IMeta;

  public pageSizeOptions = [5, 10];

  public isGenresLoaded = false;

  constructor(
    private readonly _genresService: GenresService,
  ) { }

  public ngOnInit(): void {
    this._loadGenres()
      .pipe(
        tap(() => this.isGenresLoaded = true),
      )
      .subscribe();
  }

  public pageChanged(pageEvent: PageEvent): void {
    this._loadGenres(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .subscribe();
  }

  private _loadGenres(page = 1 , limit = 10): Observable<IApiResponse> {
    return this._genresService.getGenres(page, limit)
      .pipe(
        tap((response) => {
          this.genres = response.genres || [];
          this.meta = response.meta;
        }),
        untilDestroyed(this),
      );
  }

}
