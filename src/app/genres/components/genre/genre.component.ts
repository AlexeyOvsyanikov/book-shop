import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { GenresService } from '../../services/genres/genres.service';
import { IGenre } from '../../interface/genre.interface';
@UntilDestroy()
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {

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
