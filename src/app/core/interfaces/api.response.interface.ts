import { IGenre } from '@app/genres';
import { IAuthor } from '@app/authors';
import { IBook } from '@app/books';

import { IMeta } from './meta.interface';

export interface IApiResponse {
  genres?: IGenre[];
  authors?: IAuthor[];
  books?: IBook[];
  meta: IMeta;
}
