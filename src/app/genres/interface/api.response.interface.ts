import { IMeta } from '@common/interface/api.response.meta.interface.ts';

import { IGenre } from './genre.interface';

export interface IGenresApiResponse {
  genres: IGenre[];
  meta: IMeta;
}
