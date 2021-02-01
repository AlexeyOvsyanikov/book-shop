import { Genre } from '../../modules/genres/entity/Genre';
import { Author } from '../../modules/authors/entity/Author';
import { Book } from '../../modules/books/entity/Book';


export interface Meta {
  limit: number;
  page: number;
  pages: number;
  records: number;
}

export interface ApiResponse {
  genres?: Genre[];
  authors?: Author[];
  books?: Book[];
  meta: Meta;
}
