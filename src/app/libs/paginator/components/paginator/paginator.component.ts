import { Component, Input, OnInit, Output , EventEmitter, Inject } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { IMeta } from '@common';
import { PAGE_SIZE_OPTIONS } from '@common';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {

  @Input()
  public meta!: IMeta;

  @Output()
  public readonly changed = new EventEmitter<IMeta>();

  constructor(
    @Inject(PAGE_SIZE_OPTIONS)
    public pageSizeOptions: number[],
  ) { }

  public ngOnInit(): void {
  }

  public onChanged(pageEvent: PageEvent): void {
    this.meta.page = pageEvent.pageIndex + 1;
    this.meta.limit = pageEvent.pageSize;

    this.changed.emit(this.meta);
  }

}
