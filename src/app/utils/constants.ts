import { IProduct } from '../types/interfaces';

export const INFO_LIST: string[] = ['category', 'brand', 'price', 'discountPercentage', 'rating', 'stock'];
export const SEARCH_CATEGORIES: string[] = ['title', 'description', 'category', 'brand', 'price', 'discountPercentage', 'rating', 'stock'];
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
export const VALUE_TIMER = 5;
export const MASTERCARD_IMG = require('../../assets/svg/mastercard-logo.svg');
export const VISA_IMG = require('../../assets/svg/visa-logo.svg');
export const AMERICAN_EXPRESS_IMG = require('../../assets/svg/american-logo.svg');
export const SEARCH_PLACEHOLDER = 'Search products';
export const MODAL_TIMER_INTERVAL = 1000;
export const MODAL_CLEAR_INTERVAL_TIMEOUT = 1000;
export const MODAL_REDIRECT_TIMEOUT = 5000;
