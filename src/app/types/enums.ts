export const enum ProductsAction {
  ADD,
  DETAILS,
}

export const enum FiltersAction {
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

export const enum CardButtonTitles {
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

export const enum ProductsHeaderAction {
  SORT,
  SEARCH,
  TOGGLE_VIEW,
}

export enum SortType {
  DEFAULT = 'Sort by default',
  PRICE_ASC = 'Sort by price \u2191',
  PRICE_DESC = 'Sort by price \u2193',
  RATING_ASC = 'Sort by rating \u2191',
  RATING_DESC = 'Sort by rating \u2193',
  DISCOUNT_ASC = 'Sort by discount \u2191',
  DISCOUNT_DESC = 'Sort by discount \u2193',
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
