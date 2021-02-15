import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { SpinnerService } from '@common';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {

  public rotate$: Observable<boolean>;

  constructor(private readonly _spinerService: SpinnerService) {
    this.rotate$ = this._spinerService.rotate$;
  }

  public ngOnInit(): void {
  }

}
