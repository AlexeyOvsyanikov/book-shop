import { IMeta } from '@common';

import { IBook } from './book.interface';

export interface IBooksApiResponse {
  books: IBook[];
  meta: IMeta;
}
