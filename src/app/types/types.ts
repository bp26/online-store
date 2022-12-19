import { IProduct } from './interfaces';
import { ProductsAction } from './enums';

export type ProductsData = IProduct[];

export type ProductsCallback = (action: ProductsAction, id: number) => void;

export type CartList = {
  [key: string]: number;
};

export type ListFilters = 'category' | 'brand';
export type CountFilters = 'price' | 'stock';

export type ListOption = {
  [key: string]: {
    current: number;
    full: number;
  };
};
export type CountOption = {
  min: number;
  max: number;
};
