import { IProduct } from './interfaces';
import { ProductsAction } from './enums';
import { FiltersAction } from './enums';
import { FiltersType } from './enums';

export type ProductsData = IProduct[];

export type ProductsCallback = (action: ProductsAction, id: number) => void;
export type FiltersCallback = (action: FiltersAction, filter?: string | CountOptions) => void;

export type CartList = {
  [key: string]: number;
};

export type ListFilters = 'category' | 'brand';
export type CountFilters = 'price' | 'stock';

export type ListOptions = {
  [key: string]: {
    current: number;
    full: number;
  };
};
export type CountOptions = {
  min: number;
  max: number;
};

export type FiltersData = {
  type: FiltersType;
  query: string;
};
