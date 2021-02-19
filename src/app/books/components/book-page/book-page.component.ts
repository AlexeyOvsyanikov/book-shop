import {
  Component,
  Input,
  Output ,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { UntilDestroy } from '@ngneat/until-destroy';

import { IBook } from '../../interface/book.interface';


@UntilDestroy()
@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPageComponent {

  @Input()
  public book!: IBook;

  @Input()
  public isInCart!: boolean;

  @Output()
  public readonly isInCartChange = new EventEmitter<boolean>();

  constructor() { }

  public toggleToCart(): void {
    this.isInCartChange.emit(this.isInCart);
  }

}
