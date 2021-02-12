import { ICartitem } from './cart.item.interface';

export interface ICart {
  items: ICartitem[];
  total: number;
}
