import { IProduct, ICartList } from '../../types/interfaces';
import { products } from '../../../assets/data/products';
import { binarySearch } from '../../utils/binarySearch'

export class Cart {
  readonly list: ICartList;
  private countProdContent: HTMLParagraphElement
  private summProdContent: HTMLParagraphElement
  private countProductCart: number
  private sumProductCart: number
  private matrix: IProduct[][]
  private paginationHead: number
  private paginationPagesCount: number
  private paginationInputValue: number
  constructor() {
    this.countProdContent = <HTMLParagraphElement>document.querySelector('.cart-description-count')
    this.summProdContent = <HTMLParagraphElement>document.querySelector('.cart-description-summ')
    this.list = {};
    this.countProductCart = 0
    this.sumProductCart = 0
    this.paginationHead = 0
    this.paginationPagesCount = 1
    this.paginationInputValue = 3
    this.matrix = []
  }

  paginationHeadValue(head: number): boolean {
    if (!this.matrix[head]) {
      if (this.paginationHead !== 0) {
        this.paginationHead -= 1
        return false
      }
    }
    return true
  }

  inputUpdatePaginationHead(): void {
    this.paginationHead = 0
  }

  setPaginationInputValue(count: number): void {
    this.paginationInputValue = count
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
  }

  getPaginationHead(): number {
    return this.paginationHead
  }

  getPaginationPagesCount(): number {
    return this.paginationPagesCount
  }

  setPaginationPagesCount(count: number): void {
    this.paginationPagesCount = count
  }

  toggleProduct(id: number, price: number): void {
    if (this.list[id] !== undefined) {
      this.amountProductCart(false)
      this.summaProductCart(false, price)
      delete this.list[id];
    } else {
      this.amountProductCart(true)
      this.summaProductCart(true, price)
      this.list[id] = {
        count: 1,
        price: price
      };
    }
  }

  summaProductCart(flag: boolean, price: number): void {
    if (flag) {
      this.sumProductCart += price
      this.summProdContent.textContent = `${this.sumProductCart}`
    } else {
      this.sumProductCart -= price
      this.summProdContent.textContent = `${this.sumProductCart}`
    }
  }

  amountProductCart(flag: boolean): void {
    if (flag) {
      this.countProductCart += 1
      this.countProdContent.textContent = `${this.countProductCart}`
    } else {
      this.countProductCart -= 1
      this.countProdContent.textContent = `${this.countProductCart}`
    }
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
      this.list[id].count += 1;
      this.list[id].price += price
    } else {
      if (this.list[id].count === 1) {
        delete this.list[id];
      } else {
        this.list[id].count -= 1;
        this.list[id].price -= price
      }
    }
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
    return this.matrix
  }
}
