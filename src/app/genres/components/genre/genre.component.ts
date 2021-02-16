import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { UntilDestroy } from '@ngneat/until-destroy';

import { IGenre } from '../../interface/genre.interface';

@UntilDestroy()
@Component({
  selector: 'app-genre-component',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreComponent {

  @Input()
  public genre!: IGenre;

}
