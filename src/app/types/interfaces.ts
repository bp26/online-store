import { ListOption } from './types';
import { CountOption } from './types';

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
  category: ListOption;
  brand: ListOption;
  price: CountOption;
  stock: CountOption;
}

export interface IFilters {
  category: string[];
  brand: string[];
  price: CountOption;
  stock: CountOption;
}
