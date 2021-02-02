import { IGenre } from '../../modules/genres/interface/genre.interface';
import { IAuthor } from '../../modules/authors/interface/author.interface';
import { IBook } from '../../modules/books/interface/book.interface';
import { IMeta } from './meta.interface';


export interface IApiResponse {
  genres?: IGenre[];
  authors?: IAuthor[];
  books?: IBook[];
  meta: IMeta;
}
