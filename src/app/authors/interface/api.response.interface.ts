import { IMeta } from '@common';

import { IAuthor } from './author.interface';

export interface IAuthorApiResponse {
  authors: IAuthor[];
  meta: IMeta;
}
