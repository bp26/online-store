import { IProduct } from './interfaces';
import { ProductsAction } from './enums';

export type ProductsData = IProduct[];

export type ProductsCallback = (action: ProductsAction, id: number) => void;

export type CartList = {
  [key: string]: number;
};
