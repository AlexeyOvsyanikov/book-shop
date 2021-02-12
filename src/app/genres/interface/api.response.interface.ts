import { IMeta } from '@common';

import { IGenre } from './genre.interface';

export interface IGenresApiResponse {
  genres: IGenre[];
  meta: IMeta;
}
