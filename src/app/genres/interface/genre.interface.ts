import { IBook } from '@app/books';
export interface IGenre {
  id: number;
  name: string;
  books?: IBook[];
}
