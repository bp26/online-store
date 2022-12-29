import { IProduct } from './interfaces';
import { ProductsAction } from './enums';
import { FiltersAction } from './enums';
import { FiltersType } from './enums';

export type ProductsData = IProduct[];

export type ProductsCallback = (action: ProductsAction, id: number) => void;
export type FiltersCallback = (action: FiltersAction, filtersData?: FiltersData) => void;

export type CartList = {
  [key: string]: number;
};

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
