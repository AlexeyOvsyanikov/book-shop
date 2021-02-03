import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthorsService } from '@app/authors/services/authors/authors.service';
import { BooksService } from '@app/books/services/books/books.service';
import { IAuthor } from '@app/authors/interface/author.interface';

@UntilDestroy()
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent implements OnInit {

  @Input()
  public author!: IAuthor;

  public constructor(
    private readonly _authorService: AuthorsService,
    private readonly _bookService: BooksService,
    private readonly _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._activatedRoute.params.pipe(
      switchMap((params) => this._authorService.getAuthor(params.id)),
      untilDestroyed(this),
    ).subscribe((author) => {
      this.author = author;
    });
  }

}
