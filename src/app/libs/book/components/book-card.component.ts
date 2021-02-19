import {
  Component,
  Input ,
  Output ,
  EventEmitter ,
  OnInit,
  ChangeDetectionStrategy,
  NgZone,
} from '@angular/core';

import { IBook } from '@app/books';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCardComponent implements OnInit {

  @Input()
  public book!: IBook;

  @Input()
  public isInCart = false;

  @Output()
  public readonly isInCartChange = new EventEmitter<boolean>();

  constructor(
    private _ngZone: NgZone,
  ) { }

  public ngOnInit(): void {
  }

  public toggleToCart(): void {
    this.isInCartChange.emit(!this.isInCart);
  }

}
