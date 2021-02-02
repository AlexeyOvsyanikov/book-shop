import { IGenre } from '@app/modules/genres/interface/genre.interface';
import { IAuthor } from '@app/modules/authors/interface/author.interface';
import { IBook } from '@app/modules/books/interface/book.interface';
import { IMeta } from './meta.interface';

export interface IApiResponse {
  genres?: IGenre[];
  authors?: IAuthor[];
  books?: IBook[];
  meta: IMeta;
}
