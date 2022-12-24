import { CartList } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { products } from '../../../assets/data/products';
import { binarySearch } from '../../utils/binarySearch'

export class Cart {
  readonly list: CartList;
  private countProdContent: HTMLParagraphElement
  private summProdContent: HTMLParagraphElement
  private countProductCart: number
  private sumProductCart: number
  private matrix: IProduct[][]
  constructor() {
    this.countProdContent = <HTMLParagraphElement>document.querySelector('.cart-description-count')
    this.summProdContent = <HTMLParagraphElement>document.querySelector('.cart-description-summ')
    this.list = {};
    this.countProductCart = 0
    this.sumProductCart = 0
    this.matrix = []
  }

  toggleProduct(id: number, price: number): void {
    if (this.list[id] !== undefined) {
      this.amountProductCart(false)
      this.summaProductCart(false, price)
      delete this.list[id];
    } else {
      this.amountProductCart(true)
      this.summaProductCart(true, price)
      this.list[id] = 1;
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

  getCartList(id: number, price: number): number {
    return this.list[id];
  }

  incOrDecProduct(id: number, flag: boolean) {
    if (flag) {
      this.list[id] += 1;

    } else {
      if (this.list[id] === 1) {
        delete this.list[id];
      } else {
        this.list[id] -= 1;
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
