import { ICartitem } from './cart.item.interface';

export interface ICart {
  cartItems: ICartitem[];
  cartTotal: number;
}
