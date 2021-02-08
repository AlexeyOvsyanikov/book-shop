import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CartService } from '@app/cart';

import { GenresService } from '../../services/genres/genres.service';
import { IGenre } from '../../interface/genre.interface';
@UntilDestroy()
@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
})
export class GenreComponent implements OnInit {

  @Input()
  public genre!: IGenre;

  constructor(
    private readonly _genreService: GenresService,
    private readonly _cartService: CartService,
    private readonly _activatedRouted: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._genreService.getGenre(this._activatedRouted.snapshot.params.id)
      .pipe(untilDestroyed(this))
      .subscribe((genre) => {
        this.genre = genre;

        if (this.genre && this.genre.books) {
          this._cartService.initBooks(this.genre.books);
        }
      });
  }

}
