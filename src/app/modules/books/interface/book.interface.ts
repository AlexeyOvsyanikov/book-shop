import { IGenre } from '../../genres/interface/genre.interface';

export interface IBook {
  id: number;
  title: string;
  description: string;
  author_id: number;
  price: number;
  genres: IGenre[];
  image: string;
  writing_date: string;
  release_date: string;
  isInCart: boolean;
}
