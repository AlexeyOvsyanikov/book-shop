import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';

import { GenresService } from '../../services/genres/genres.service';
import { IGenre } from '../../interface/genre.interface';

@UntilDestroy()
@Component({
  selector: 'app-genre-container',
  templateUrl: './genre.container.html',
  styleUrls: ['./genre.container.scss'],
})
export class GenreContainer implements OnInit {

  public genre!: IGenre;

  public get genreId(): number {
    return this._activatedRouted.snapshot.params.id;
  }
  constructor(
    private readonly _genresService: GenresService,
    private readonly _activatedRouted: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._genresService.get(this.genreId)
      .pipe(untilDestroyed(this))
      .subscribe((genre) => {
        this.genre = genre;
      });
  }

}
