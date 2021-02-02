import { Component, OnDestroy, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { IMeta } from '../../../../common/interface/meta.interface';
import { IAuthor } from '../../interface/author.interface';
import { AuthorsService } from '../../services/authors/authors.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  authors!: IAuthor[];
  meta!: IMeta;

  pageSizeOptions: number[] = [5, 10];

  constructor(
    private authorsService: AuthorsService
  ) { }

  ngOnInit(): void {

    this.authorsService.getAuthors()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe( response => {
        this.authors = response.authors || [];
        this.meta = response.meta;
      } );

  }

  pageChanged(pageEvent: PageEvent): void {

    this.authorsService.getAuthors(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe( response => {
        this.authors = response.authors || [];
        this.meta = response.meta;
      } );

  }

}
