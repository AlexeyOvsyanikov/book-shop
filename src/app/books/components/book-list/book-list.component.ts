import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IBook } from '../../interface/book.interface';

@Component({
  selector: 'app-book-list-component',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {

  @Input()
  public books!: IBook[];

}
