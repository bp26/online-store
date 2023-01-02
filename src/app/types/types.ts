import { IProduct, ICartList } from './interfaces';
import { ProductsAction } from './enums';
import { FiltersAction } from './enums';
import { FiltersType } from './enums';

export type ProductsData = IProduct[];

export type ProductsCallback = (action: ProductsAction, id: number, price: number) => void;
export type FiltersCallback = (action: FiltersAction, filtersData?: FiltersData) => void;

export type funcVoid = (price: number, id: number) => void;
export type funcVoidId = (id: number) => void;

export type localStorageCartEmpty = number | Record<string, never> | [];
export type localStorageCartFull = number | IProduct[][] | ICartList | string[];

export type ListFilterNames = 'category' | 'brand';
export type CountFilterNames = 'price' | 'stock';

export type ListOptions = {
  [key: string]: {
    current: number;
    full: number;
    isChecked: boolean;
  };
};

export type CountFilter = {
  min: number;
  max: number;
  isActive: boolean;
};

export type CountOptions = CountFilter & {
  start: number;
  end: number;
  isEmpty: boolean;
};

export type FiltersData = {
  type: FiltersType;
  filter: string | [number, number];
};
