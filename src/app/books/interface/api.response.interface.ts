import { IMeta } from '@common/interface/api.response.meta.interface.ts';

import { IBook } from './book.interface';

export interface IBooksApiResponse {
  books: IBook[];
  meta: IMeta;
}
