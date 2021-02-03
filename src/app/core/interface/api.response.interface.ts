import { IGenre } from '@app/genres/interface/genre.interface';
import { IAuthor } from '@app/authors/interface/author.interface';
import { IBook } from '@app/books/interface/book.interface';
import { IMeta } from './meta.interface';

export interface IApiResponse {
  genres?: IGenre[];
  authors?: IAuthor[];
  books?: IBook[];
  meta: IMeta;
}
