import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IAuthor } from '../../interface/author.interface';

@Component({
  selector: 'app-author-component',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorPageComponent {

  @Input()
  public author!: IAuthor;

}
