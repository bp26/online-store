import { IProduct } from './interfaces';
import { ProductsAction } from './enums';

export type ProductsData = IProduct[];

export type ProductsCallback = (action: ProductsAction, id: number, price: number) => void;

export type CartList = {
  [key: string]: number ;
};

export type funcVoid = (price: number, id: number) => void
export type funcVoidId = (id: number) => void
