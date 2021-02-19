import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { IGenre } from '../../interface/genre.interface';

@Component({
  selector: 'app-genre-list-item',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {

  @Input()
  public genre!: IGenre;

  constructor() { }

  public ngOnInit(): void {  }

}
