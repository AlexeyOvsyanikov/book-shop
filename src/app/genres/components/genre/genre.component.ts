import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GenresService } from '@app/genres/services/genres/genres.service';
import { IGenre } from '@app/genres/interface/genre.interface';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  @Input()
  public genre!: IGenre;

  public constructor(
    private _genreService: GenresService,
    private _activatedRouted: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this._activatedRouted.params.pipe(
      switchMap( params => this._genreService.getGenre(params.id) )
    ).subscribe( genre => this.genre = genre );
  }

}
