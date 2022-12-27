import { localStorageCart } from '../types/enums'
import { localStorageCartEmpty, localStorageCartFull } from '../types/types'

export function localStorageGuard(name: string): localStorageCartEmpty | localStorageCartFull | void {
  const data = localStorage.getItem(name)
  if (data) {
    return JSON.parse(data)
  } else {
    switch (name) {
      case localStorageCart.PAGINATION_HEAD:
        return 0
      case localStorageCart.PAGINATION_INPUT_VALUE:
        return 3
      case localStorageCart.PAGINATION_PAGES_COUNT:
        return 1
      case localStorageCart.CART_LIST:
        return {}
      case localStorageCart.SUM_PRODUCT_CART:
        return 0
      case localStorageCart.COUNT_PRODUCT_CART:
        return 0
      case localStorageCart.MATRIX_PAGINATION:
        return []
    }
  }
}
