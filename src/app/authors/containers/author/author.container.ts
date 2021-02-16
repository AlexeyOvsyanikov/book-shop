import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { startWith, switchMap, tap, filter } from 'rxjs/operators';

import { UntilDestroy , untilDestroyed } from '@ngneat/until-destroy';

import { AuthorsService } from '../../services/authors/authors.service';
import { IAuthor } from '../../interface/author.interface';

@UntilDestroy()
@Component({
  selector: 'app-author-container',
  templateUrl: './author.container.html',
  styleUrls: ['./author.container.scss'],
})
export class AuthorContainer implements OnInit {

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
        filter((params) => params.id),
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
