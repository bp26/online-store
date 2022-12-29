import { IProduct, ICartList } from '../../types/interfaces'
import { products } from '../../../assets/data/products'
import { discountsObj } from '../../../assets/discount/discount'
import { binarySearch } from '../../utils/binarySearch'
import { localStorageGuard } from '../../utils/localGuard'
import { localStorageCart } from '../../types/enums'

export class Cart {
  readonly list: ICartList
  private countProdContent: HTMLParagraphElement
  private summProdContent: HTMLParagraphElement
  private countProductCart: number
  private sumProductCart: number
  private matrix: IProduct[][]
  private paginationHead: number
  private paginationPagesCount: number
  private paginationInputValue: number
  private nameDiscount: string[]
  private discountProcent: number
  private discountListItem: number
  constructor() {
    this.countProdContent = <HTMLParagraphElement>document.querySelector('.cart-description-count')
    this.summProdContent = <HTMLParagraphElement>document.querySelector('.cart-description-summ')
    this.nameDiscount = []
    this.discountProcent = 0
    this.discountListItem = 0

    const CartList = localStorageGuard(localStorageCart.CART_LIST)
    const CountProductCart = localStorageGuard(localStorageCart.COUNT_PRODUCT_CART)
    const SumProductCart = localStorageGuard(localStorageCart.SUM_PRODUCT_CART)
    const PaginationHead = localStorageGuard(localStorageCart.PAGINATION_HEAD)
    const PaginationPagesCount = localStorageGuard(localStorageCart.PAGINATION_PAGES_COUNT)
    const PaginationInputValue = localStorageGuard(localStorageCart.PAGINATION_INPUT_VALUE)
    const Matrix = localStorageGuard(localStorageCart.MATRIX_PAGINATION)
    this.list = CartList instanceof Object && !Array.isArray(CartList) ? CartList : {}
    this.countProductCart = typeof CountProductCart === 'number' ? CountProductCart : 0
    this.sumProductCart = typeof SumProductCart === 'number' ? SumProductCart : 0
    this.paginationHead = typeof PaginationHead === 'number' ? PaginationHead : 0
    this.paginationPagesCount = typeof PaginationPagesCount === 'number' ? PaginationPagesCount : 1
    this.paginationInputValue = typeof PaginationInputValue === 'number' ? PaginationInputValue : 3
    this.matrix = Array.isArray(Matrix) ? Matrix : []
    this.summProdContent.textContent = `${this.sumProductCart}`
    this.countProdContent.textContent = `${this.countProductCart}`
  }

  paginationHeadValue(head: number): boolean {
    if (!this.matrix[head]) {
      if (this.paginationHead !== 0) {
        this.paginationHead -= 1
        localStorage.setItem('paginationHead', JSON.stringify(this.paginationHead))
        return false
      }
    }
    return true
  }

  inputUpdatePaginationHead(): void {
    this.paginationHead = 0
    localStorage.setItem('paginationHead', JSON.stringify(this.paginationHead))
  }

  setPaginationInputValue(count: number): void {
    this.paginationInputValue = count
    localStorage.setItem('paginationInputValue', JSON.stringify(this.paginationInputValue))
  }

  getPaginationInputValue(): number {
    return this.paginationInputValue
  }

  togglePaginationHead(flag: boolean): void {
    if (flag) {
      this.paginationHead += 1
    } else {
      this.paginationHead -= 1
    }
    localStorage.setItem('paginationHead', JSON.stringify(this.paginationHead))
  }

  getPaginationHead(): number {
    return this.paginationHead
  }

  getPaginationPagesCount(): number {
    return this.paginationPagesCount
  }

  setPaginationPagesCount(count: number): void {
    this.paginationPagesCount = count
    localStorage.setItem('paginationPagesCount', JSON.stringify(this.paginationPagesCount))
  }

  toggleProduct(id: number, price: number): void {
    if (this.list[id] !== undefined) {
      this.amountProductCart(false)
      this.summaProductCart(false, price)
      delete this.list[id]
    } else {
      this.amountProductCart(true)
      this.summaProductCart(true, price)
      this.list[id] = {
        count: 1,
        price: price,
      }
    }
    localStorage.setItem('cartList', JSON.stringify(this.list))
  }

  summaProductCart(flag: boolean, price: number): void {
    if (flag) {
      this.sumProductCart += price
      this.summProdContent.textContent = `${this.sumProductCart}`
    } else {
      this.sumProductCart -= price
      this.summProdContent.textContent = `${this.sumProductCart}`
    }
    localStorage.setItem('sumProductCart', JSON.stringify(this.sumProductCart))
  }

  amountProductCart(flag: boolean): void {
    if (flag) {
      this.countProductCart += 1
      this.countProdContent.textContent = `${this.countProductCart}`
    } else {
      this.countProductCart -= 1
      this.countProdContent.textContent = `${this.countProductCart}`
    }
    localStorage.setItem('countProductCart', JSON.stringify(this.countProductCart))
  }

  getSummaryData(): number[] {
    return [this.countProductCart, this.sumProductCart]
  }

  getCartList(id: number): number[] {
    const count = this.list[id].count
    const price = this.list[id].price
    return [count, price]
  }

  incOrDecProduct(id: number, price: number, flag: boolean) {
    if (flag) {
      this.list[id].count += 1
      this.list[id].price += price
    } else {
      if (this.list[id].count === 1) {
        delete this.list[id]
      } else {
        this.list[id].count -= 1
        this.list[id].price -= price
      }
    }
    localStorage.setItem('cartList', JSON.stringify(this.list))
  }

  matrixCard(items: number): IProduct[][] {
    this.matrix.length = 0
    let count = 0
    const amountElCart = Object.keys(this.list)
    const amountArrPage = Math.ceil(amountElCart.length / items)
    for (let i = 0; i < amountArrPage; i += 1) {
      this.matrix.push([])
      for (let j = 0; j < items && amountElCart[count]; j += 1) {
        const productObject = binarySearch(products, Number(amountElCart[count]))
        this.matrix[i].push(productObject)
        count += 1
      }
    }
    localStorage.setItem('matrixPagination', JSON.stringify(this.matrix))
    return this.matrix
  }

  validationInputSummary(value: string) {
    if (/^rs$/i.test(value)) {
      return [discountsObj[0].name, discountsObj[0].value]
    }
    if (/^epm$/i.test(value)) {
      return [discountsObj[1].name, discountsObj[1].value]
    }
    return false
  }

  setDiscountListItem(flag: boolean): void {
    if (flag) {
      this.discountListItem += 1
    } else {
      this.discountListItem -= 1
    }
  }

  setDiscountProcent(flag: boolean, discount: number): void {
    if (flag) {
      this.discountProcent += discount
    } else {
      this.discountProcent -= discount
    }
  }

  getDiscountListItem(): number {
    return this.discountListItem
  }

  setNameDiscount(name: string): void {
    this.nameDiscount.push(name)
  }

  deleteNameDiscount(name: string): void {
    const indexName = this.nameDiscount.indexOf(name)
    this.nameDiscount.splice(indexName, 1)
  }

  getNameDiscount(name: string): boolean {
    const searchName = this.nameDiscount.includes(name)
    return searchName
  }

  calculateProcent(): number {
    const procent = (this.sumProductCart / 100) * this.discountProcent
    const result = this.sumProductCart - procent
    return result
  }
}
