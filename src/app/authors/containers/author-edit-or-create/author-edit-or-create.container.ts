import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';
import { ICanComponentDeactivate, SNACK_BAR_SUCCESS_CONFIG } from '@common';

import { AuthorsService } from '../../services/authors/authors.service';
import { IAuthor } from '../../interface/author.interface';

@UntilDestroy()
@Component({
  selector: 'app-edit-create-container',
  templateUrl: './author-edit-or-create.container.html',
  styleUrls: ['./author-edit-or-create.container.scss'],
})
export class AuthorEditOrCreateContainer implements OnInit , ICanComponentDeactivate {

  public author!: IAuthor;

  public isEditMode = false;

  constructor(
    @Inject(SNACK_BAR_SUCCESS_CONFIG)
    private readonly _snackBarSuccessConfig: MatSnackBarConfig,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _snackBarService: MatSnackBar,
    private readonly _authorsService: AuthorsService,
  ) {
    this.isEditMode = this._editMode;
    this.author = {
      id: -1,
      first_name: '',
      last_name: '',
    };
  }

  public ngOnInit(): void {
    if (this.isEditMode) {
      this._loadAuthor();
    }
  }

  public canDeactivate(): Observable<boolean> | Promise<true> | boolean {
    // return !this.formEdited;
    return true;
  }

  public editOrCreate(): void {
    if (this.isEditMode) {
      this._update();
    } else {
      this._create();
    }
  }

  private _loadAuthor(): void {
    this._authorsService.get(this._authorId)
      .pipe(
        tap((author) => {
          this.author = author;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  private _update(): void {
    this._authorsService.update(this.author)
      .pipe(
        tap(() => {
          this._snackBarService.open(
            'The author updated successfully',
            'Close' ,
            this._snackBarSuccessConfig,
          );
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  private _create(): void {
    this._authorsService
      .create(this.author)
      .pipe(
        tap(() => {
          this._snackBarService.open(
            'The author created successfully',
            'Close' ,
            this._snackBarSuccessConfig,
          );
          this._router.navigate(['/authors']);
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  private get _authorId(): number {
    return this._route.snapshot.params.id;
  }

  private get _editMode(): boolean {
    return this._route.snapshot.data.edit;
  }

}
