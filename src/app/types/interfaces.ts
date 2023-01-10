import { CountOptions } from './types';
import { ListOptions } from './types';
import { CountFilter } from './types';
import { ProductsData } from './types';
import { ProductsCallback } from './types';
import { FiltersCallback } from './types';
import { SortType } from './enums';
import { SearchCallback } from './types';
import { SortCallback } from './types';
import { ToggleDisplayCallback } from './types';
import { ProductDisplay } from './enums';
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
  productsOptions: IProductsOptions;
  filterOptions: IFilterOptions;
  headerOptions: IProductsHeaderOptions;
}

export interface IProductsOptions {
  data: ProductsData;
  cartArray: number[];
  productDisplay: ProductDisplay;
}

export interface IProductsHeaderOptions {
  sortType: SortType;
  productsCount: number;
}

export interface IProductsPageCallbacks {
  productsCallback: ProductsCallback;
  filtersCallback: FiltersCallback;
  headerCallback: IProductsHeaderCallbacks;
}

export interface IProductsHeaderCallbacks {
  sortCallback: SortCallback;
  searchCallback: SearchCallback;
  toggleDisplayCallback: ToggleDisplayCallback;
}

export interface IDetailsPageData {
  product: IProduct;
  inCart: boolean;
}

export interface IDetailsPageData {
  product: IProduct;
  inCart: boolean;
}
