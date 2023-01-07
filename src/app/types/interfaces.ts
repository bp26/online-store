import { CountOptions } from './types';
import { ListOptions } from './types';
import { CountFilter } from './types';
import { ProductsData } from './types';
import { ProductsCallback } from './types';
import { FiltersCallback } from './types';
import { DetailsCallback } from './types';

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

export interface ICartList {
  [key: string]: IDescriptionCartList;
}

export interface IDiscount {
  [key: string]: IDiscountValue;
}

interface IDiscountValue {
  name: string;
  value: string;
}

interface IDescriptionCartList {
  count: number;
  price: number;
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

export interface IDetailsPageData {
  product: IProduct;
  inCart: boolean;
}
