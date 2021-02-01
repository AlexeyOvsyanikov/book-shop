import { Genre } from '../../genres/entity/Genre';

export interface IBook {
  id: number;
  title: string;
  description: string;
  author_id: number;
  price: number;
  genres: Genre[];
  image: string;
  writing_date: string;
  release_date: string;
}
