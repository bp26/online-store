import { IProduct, ICartList } from './interfaces';
import { ProductsAction } from './enums';

export type ProductsData = IProduct[];

export type ProductsCallback = (action: ProductsAction, id: number, price: number) => void;

export type funcVoid = (price: number, id: number) => void;
export type funcVoidId = (id: number) => void;

export type localStorageCartEmpty = number | Record<string, never> | [];
export type localStorageCartFull = number | IProduct[][] | ICartList | string[];
