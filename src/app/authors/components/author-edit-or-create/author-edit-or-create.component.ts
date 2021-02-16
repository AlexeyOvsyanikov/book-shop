import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';
import { ICanComponentDeactivate } from '@common';

import { AuthorsService } from '../../services/authors/authors.service';
import { IAuthor } from '../../interface/author.interface';

@UntilDestroy()
@Component({
  selector: 'app-edit-create-component',
  templateUrl: './author-edit-or-create.component.html',
  styleUrls: ['./author-edit-or-create.component.scss'],
})
export class AuthorEditOrCreateComponent implements OnInit , ICanComponentDeactivate {

  private _formEdited = false;

  public author: IAuthor = {
    id: -1,
    first_name: '',
    last_name: '',
  };

  public isEdit = false;

  public authorCredentialsGroup: FormGroup;

  constructor(
    private readonly _authorsService: AuthorsService,
    private readonly _route: ActivatedRoute,
    private readonly _formBuilder: FormBuilder,
  ) {
    this.authorCredentialsGroup = this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('' , [Validators.required]),
    });
    this.isEdit = this._route.snapshot.data.edit;
  }

  public ngOnInit(): void {
    if (this.isEdit) {
      this._loadAuthor();
    }
  }

  public get authorId(): number {
    return this._route.snapshot.params.id;
  }

  public saveOrCreate(): void {
    console.log(this.authorCredentialsGroup.valid);
  }

  public canDeactivate(): Observable<boolean> | Promise<true> | boolean {
    return !this._formEdited;
  }

  public markFormEdited(): void {
    console.log('EDITED!');
    this._formEdited = true;
  }

  public showErrorMessage(): string {
    if (
      this.authorCredentialsGroup.controls.firstName.hasError('required') ||
      this.authorCredentialsGroup.controls.lastName.hasError('required')
    ) {
      return 'Please check all fields';
    }

    return '';
  }

  private _loadAuthor(): void {
    this._authorsService.get(this.authorId)
      .pipe(
        tap((author) => {
          this.author = author;
        }),
        untilDestroyed(this),
      ).subscribe();
  }

}
