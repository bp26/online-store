import { CountOptions } from './types';
import { ListOptions } from './types';
import { CountFilter } from './types';
import { ProductsData } from './types';
import { ProductsCallback } from './types';
import { FiltersCallback } from './types';

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IFilterOptions {
  category: ListOptions;
  brand: ListOptions;
  price: CountOptions;
  stock: CountOptions;
}

export interface IFilters {
  category: string[];
  brand: string[];
  price: CountFilter | null;
  stock: CountFilter | null;
}

export interface IProductsPageData {
  data: ProductsData;
  filterOptions: IFilterOptions;
}

export interface IProductsPageCallbacks {
  productsCallback: ProductsCallback;
  filtersCallback: FiltersCallback;
}
