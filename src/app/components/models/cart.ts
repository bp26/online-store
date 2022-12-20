import { CartList } from '../../types/types';

export class Cart {
  readonly list: CartList;
  private countProdContent: HTMLParagraphElement
  private summProdContent: HTMLParagraphElement
  private countProductCart: number
  private sumProductCart: number
  constructor() {
    this.countProdContent = <HTMLParagraphElement>document.querySelector('.cart-description-count')
    this.summProdContent = <HTMLParagraphElement>document.querySelector('.cart-description-summ')
    this.list = {};
    this.countProductCart = 0
    this.sumProductCart = 0
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

  getCartList(): CartList {
    return this.list;
  }

  incrementProduct(id: number) {
    this.list[id] += 1;
  }

  decrementProduct(id: number) {
    if (this.list[id] === 1) {
      delete this.list[id];
    } else {
      this.list.id -= 1;
    }
  }
}
