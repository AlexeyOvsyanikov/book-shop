import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { GenresService } from '@app/genres/services/genres/genres.service';
import { IGenre } from '@app/genres/interface/genre.interface';
@UntilDestroy()
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {

  @Input()
  public genre!: IGenre;

  public constructor(
    private readonly _genreService: GenresService,
    private readonly _activatedRouted: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._activatedRouted.params.pipe(
      switchMap((params) => this._genreService.getGenre(params.id)),
      untilDestroyed(this),
    ).subscribe((genre) => this.genre = genre);
  }

}
