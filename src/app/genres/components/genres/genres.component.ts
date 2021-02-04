import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { IMeta } from '@app/core/interfaces/meta.interface';
import { GenresService } from '@app/genres/services/genres/genres.service';
import { IGenre } from '@app/genres/interface/genre.interface';

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

  public constructor(
    private readonly _genresService: GenresService,
  ) { }

  public ngOnInit(): void {
    this._genresService.getGenres()
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((response) => {
        this.genres = response.genres || [];
        this.meta = response.meta;
        this.isGenresLoaded = true;
      });
  }

  public pageChanged(pageEvent: PageEvent): void {
    this._genresService.getGenres(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((response) => {
        this.genres = response.genres || [];
        this.meta = response.meta;
      });
  }

}
