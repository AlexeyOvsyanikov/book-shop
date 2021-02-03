import { IBook } from '@app/books/interface/book.interface';
export interface IGenre {
  id: number;
  name: string;
  books?: IBook[];
}
