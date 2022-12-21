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
export type CountOptions = {
  min: number;
  max: number;
};

export type CountFilter = CountOptions & { isActive: boolean };

export type FiltersData = {
  type: FiltersType;
  filter: string | [number, number];
};
