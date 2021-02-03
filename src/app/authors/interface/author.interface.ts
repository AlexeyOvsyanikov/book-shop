import { IBook } from '@app/books/interface/book.interface';
export interface IAuthor {
  id: number;
  first_name: string;
  last_name: string;
  books?: IBook[];
}
