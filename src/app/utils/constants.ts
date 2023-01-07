import { IProduct } from '../types/interfaces';

export const infoList: string[] = ['category', 'brand', 'price', 'discount', 'rating', 'stock'];
export const BREADCRUMBS_LIST: Array<keyof IProduct> = ['category', 'brand', 'title'];
export const DETAILS_INFO_LIST: Array<keyof IProduct> = ['description', 'discountPercentage', 'rating', 'stock', 'brand', 'category'];

export const DEFAULT_COUNT_PRODUCT_CART = 0;
export const DEFAULT_SUM_PRODUCT_CART = 0;
export const DEFAULT_PAGINATION_HEAD = 0;
export const DEFAULT_PAGINATION_PAGES_COUNT = 1;
export const DEFAULT_PAGINATION_INPUT_VALUE = 3;
export const DEFAULT_DISCOUNT_LIST_ITEM = 0;
export const DEFAULT_DISCOUNT_PROCENT = 0;
export const ONE_HUNDRED = 100;
