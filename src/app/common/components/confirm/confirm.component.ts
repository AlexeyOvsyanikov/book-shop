import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

  public dialogContent: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly _dialogData: string,
  ) {
    this.dialogContent = this._dialogData;
  }

  public ngOnInit(): void {
  }

}
