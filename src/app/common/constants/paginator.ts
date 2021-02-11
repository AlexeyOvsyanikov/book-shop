import { InjectionToken } from '@angular/core';

export const PAGE_SIZE_OPTIONS = new InjectionToken<number[]>(
  'PaginatorPageSizeOptions',
  {
    factory: () => [ 5 , 10],
  },
);

export const DEFAULT_PAGE = new InjectionToken<number>(
  'PaginatorDefaultPage',
  {
    factory: () => 1,
  },
);

export const DEFAULT_ITEMS_LIMIT = new InjectionToken<number>(
  'PaginatorDefaultItemsLimit',
  {
    factory: () => 10,
  },
);
