import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { startWith, switchMap, tap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthorsService } from '../../services/authors/authors.service';
import { IAuthor } from '../../interface/author.interface';

@UntilDestroy()
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {

  public author!: IAuthor;

  constructor(
    private readonly _authorsService: AuthorsService,
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public get authorId(): number {
    return this._activatedRoute.snapshot.params.id;
  }
  public ngOnInit(): void {
    this._listenAuthorChange();
  }

  private _listenAuthorChange(): void {
    this._activatedRoute.params
      .pipe(
        startWith({ id: this.authorId }),
        switchMap((params) => {
          return this._authorsService.get(params.id);
        }),
        tap((author) => {
          this.author = author;
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

}
