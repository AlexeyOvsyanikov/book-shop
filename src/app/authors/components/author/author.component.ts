import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthorsService , IAuthor } from '@app/authors';
@UntilDestroy()
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {

  @Input()
  public author!: IAuthor;

  constructor(
    private readonly _authorService: AuthorsService,
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._authorService.getAuthor(this._activatedRoute.snapshot.params.id)
      .pipe(untilDestroyed(this))
      .subscribe((author) => {
        this.author = author;
      });
  }

}
