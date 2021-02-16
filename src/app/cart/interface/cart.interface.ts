import { ICartItem } from './cart.item.interface';

export interface ICart {
  items: ICartItem[];
  total: number;
}
