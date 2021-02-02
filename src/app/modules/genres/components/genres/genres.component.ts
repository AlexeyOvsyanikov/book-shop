import {Component, OnInit} from '@angular/core';

import { GenresService } from '../../services/genres/genres.service';
import { IGenre } from '../../interface/genre.interface';
import { IMeta } from '../../../../common/interface/meta.interface';

import { PageEvent } from '@angular/material/paginator';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genres!: IGenre[];
  meta!: IMeta;

  pageSizeOptions: number[] = [5, 10];

  constructor(
    private genresService: GenresService
  ) { }

  ngOnInit(): void {

    this.genresService.getGenres()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe( response => {
        this.genres = response.genres || [];
        this.meta = response.meta;
      } );

  }

  pageChanged(pageEvent: PageEvent): void {

    this.genresService.getGenres(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe( response => {
        this.genres = response.genres || [];
        this.meta = response.meta;
      } );

  }
}
