import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { debounceTime, tap } from 'rxjs/operators';

import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

import { IAuthor } from '../../interface/author.interface';

@UntilDestroy()
@Component({
  selector: 'app-author-edit-or-create-component',
  templateUrl: './author-edit-or-create.component.html',
  styleUrls: ['./author-edit-or-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorEditOrCreateComponent implements OnInit , OnChanges {

  @Input()
  public author!: IAuthor;

  @Input()
  public isEditMode = false;

  @Output()
  public readonly editedOrCreated = new EventEmitter<void>();

  public formEdited = false;

  public authorCredentialsGroup!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    this._initForm();
  }

  public ngOnInit(): void { }

  public editOrCreate(): void {
    if (this.authorCredentialsGroup.valid) {
      this.editedOrCreated.emit();
    }
  }

  private _initForm(): void {
    this.authorCredentialsGroup = this._formBuilder.group({
      firstName: new FormControl(this.author.first_name, [Validators.required]),
      lastName: new FormControl(this.author.last_name , [Validators.required]),
    });
    this._addListenersToAuthorFields();
  }

  private _addListenersToAuthorFields(): void {
    this.authorCredentialsGroup.valueChanges
      .pipe(
        debounceTime(300),
        tap(({ firstName , lastName }) => {
          this.author.first_name = firstName;
          this.author.last_name = lastName;
          this.formEdited = true;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

}
