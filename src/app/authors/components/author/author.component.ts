import { switchMap } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthorsService } from '@app/authors/services/authors/authors.service';
import { IAuthor } from '@app/authors/interface/author.interface';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  @Input()
  public author!: IAuthor;

  public constructor(
    private _authorService: AuthorsService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this._activatedRoute.params.pipe(
      switchMap( params => this._authorService.getAuthor(params.id) )
    ).subscribe( author => this.author = author );

  }

}
