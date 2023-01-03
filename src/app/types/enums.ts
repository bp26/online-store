export enum ProductsAction {
  ADD,
  DETAILS,
}

export enum FiltersAction {
  FILTER,
  RESET,
  COPY,
}

export enum FiltersType {
  category = 'category',
  brand = 'brand',
  price = 'price',
  stock = 'stock',
}

export enum CardButtonTitles {
  ADD = 'ADD TO CART',
  REMOVE = 'REMOVE FROM CART',
}

export const enum localStorageCart {
  CART_LIST = 'cartList',
  COUNT_PRODUCT_CART = 'countProductCart',
  SUM_PRODUCT_CART = 'sumProductCart',
  PAGINATION_HEAD = 'paginationHead',
  PAGINATION_PAGES_COUNT = 'paginationPagesCount',
  PAGINATION_INPUT_VALUE = 'paginationInputValue',
  MATRIX_PAGINATION = 'matrixPagination',
  DISCOUNT_LIST_ITEM = 'discountListItem',
  DISCOUNT_PROCENT = 'discountProcent',
  DISCOUNT_NAME = 'nameDiscount',
  DISCOUNT_ROOT_TABLE = 'rootTableDiscount',
  DISCOUNT_STRING = 'stringDiscount',
  DISCOUNT_UL = 'ulDiscount',
  DISCOUNT_COUNT_TOTAL = 'countDiscountTotal',
  CALCULATE_PROCENT = 'calculateProcent',
}

export const enum HTMLTag {
  DIV = 'div',
  P = 'p',
  SPAN = 'span',
  INPUT = 'input',
  BUTTON = 'button',
  UL = 'ul',
  LI = 'li',
  SECTION = 'section',
  IMG = 'img',
  LABEL = 'label',
  SELECT = 'select',
}

export const enum DisplayStyle {
  BLOCK = 'block',
  NONE = 'none',
}

export enum SortType {
  DEFAULT = 'Sort by default',
  PRICE_ASC = 'Sort by price &uarr;',
  PRICE_DESC = 'Sort by brice &darr;',
  RATING_ASC = 'Sort by rating &uarr;',
  RATING_DESC = 'Sort by rating &darr;',
  DISCOUNT_ASC = 'Sort by discount &uarr;',
  DISCOUNT_DESC = 'Sort by discount &darr;',
}

export const enum SortDirection {
  ASC,
  DESC,
}

export const enum SortCategory {
  PRICE = 'price',
  DISCOUNT = 'discountPercentage',
  RATING = 'rating',
}
