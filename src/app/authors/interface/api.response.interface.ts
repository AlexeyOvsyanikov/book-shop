import { IMeta } from '@common/interface/api.response.meta.interface.ts';

import { IAuthor } from './author.interface';

export interface IAuthorApiResponse {
  authors: IAuthor[];
  meta: IMeta;
}
