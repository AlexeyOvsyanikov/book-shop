import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { untilDestroyed } from '@ngneat/until-destroy';

import { GenresService } from '../../services/genres/genres.service';
import { IGenre } from '../../interface/genre.interface';

@Component({
  selector: 'app-genre-container',
  templateUrl: './genre.container.html',
  styleUrls: ['./genre.container.scss'],
})
export class GenreContainer implements OnInit {

  public genre!: IGenre;

  constructor(
    private readonly _genresService: GenresService,
    private readonly _activatedRouted: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    const id = this._activatedRouted.snapshot.params.id;

    this._genresService.get(id)
      .pipe(untilDestroyed(this))
      .subscribe((genre) => {
        this.genre = genre;
      });
  }

}
