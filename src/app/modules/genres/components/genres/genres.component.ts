import { Component, OnInit } from '@angular/core';
import { GenresService } from '../../services/genres.service';
import { Genre } from '../../entity/Genre';
import { Meta } from '../../../../common/entity/ApiResponse';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genres!: Genre[];
  meta!: Meta;

  pageSizeOptions: number[] = [5, 10];

  constructor(
    private genresService: GenresService
  ) { }

  ngOnInit(): void {

    this.genresService.getGenres()
      .subscribe( response => {
        this.genres = response.genres || [];
        this.meta = response.meta;
      } );

  }

  pageChanged(pageEvent: PageEvent): void {

    this.genresService.getGenres(pageEvent.pageIndex + 1, pageEvent.pageSize)
      .subscribe( response => {
        this.genres = response.genres || [];
        this.meta = response.meta;
      } );

  }
}
