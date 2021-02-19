import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { IGenre } from '../../interface/genre.interface';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.scss'],
})
export class GenreCreateComponent implements OnInit {

  public genre: IGenre = {
    id: -1,
    name: '',
  };

  public formEdited = false;

  constructor() { }

  public ngOnInit(): void {
  }

  public create(): void {

  }

}
