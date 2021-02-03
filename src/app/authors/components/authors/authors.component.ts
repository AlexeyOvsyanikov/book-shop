import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { IMeta } from '@app/core/interface/meta.interface';
import { IAuthor } from '@app/authors/interface/author.interface';
import { AuthorsService } from '@app/authors/services/authors/authors.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  public authors!: IAuthor[];
  public meta!: IMeta;

  public pageSizeOptions = [5, 10];

  public constructor(
    private _authorsService: AuthorsService
  ) { }

  public ngOnInit(): void {

    this._authorsService.getAuthors()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe( response => {
        this.authors = response.authors || [];
        this.meta = response.meta;
      } );

  }

  public pageChanged(pageEvent: PageEvent): void {

    this._authorsService.getAuthors(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe( response => {
        this.authors = response.authors || [];
        this.meta = response.meta;
      } );

  }

}
