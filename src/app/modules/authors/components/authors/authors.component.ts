import { Component, OnInit } from '@angular/core';
import { Meta } from '../../../../common/entity/ApiResponse';
import { PageEvent } from '@angular/material/paginator';
import { Author } from '../../entity/Author';
import { AuthorsService } from '../../services/authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  authors!: Author[];
  meta!: Meta;

  pageSizeOptions: number[] = [5, 10];

  constructor(
    private authorsService: AuthorsService
  ) { }

  ngOnInit(): void {

    this.authorsService.getAuthors()
      .subscribe( response => {
        this.authors = response.authors || [];
        this.meta = response.meta;
      } );

  }

  pageChanged(pageEvent: PageEvent): void {

    this.authorsService.getAuthors(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .subscribe( response => {
        this.authors = response.authors || [];
        this.meta = response.meta;
      } );

  }

}
