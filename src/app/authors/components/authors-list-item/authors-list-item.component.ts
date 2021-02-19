import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

import { IAuthor } from '../../interface/author.interface';

@Component({
  selector: 'app-authors-list-item',
  templateUrl: './authors-list-item.component.html',
  styleUrls: ['./authors-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsListItemComponent {

  @Input()
  public author!: IAuthor;

  @Output()
  public readonly authorRemove = new EventEmitter<void>();

  constructor() { }

  public remove(): void {
    this.authorRemove.emit();
  }

}
