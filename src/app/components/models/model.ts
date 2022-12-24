import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { products } from '../../../assets/data/products';
import { Cart } from './cart';

export class Model {
  readonly data: ProductsData;
  readonly cart: Cart;
  private openCart: boolean;
  constructor() {
    this.data = products;
    this.cart = new Cart();
    this.openCart = false
  }

  getData(): ProductsData {
    return this.data;
  }

  getSummaryData(): number[] {
    return this.cart.getSummaryData()
  }

  toggleCountProductCart(price: number, id: number, flag: boolean): void {
    this.cart.amountProductCart(flag)
    this.cart.summaProductCart(flag, price)
    this.cart.incOrDecProduct(id, flag)
  }

  productCart(id: number, price: number): void {
    this.cart.toggleProduct(id, price)
  }

  toggleOpenCart(): Boolean {
    if (this.openCart) {
     return this.openCart = false
    }
    return this.openCart = true
  }

  getCartList(id: number, price: number) {
    return this.cart.getCartList(id, price)
  }

  getMatrixCart(value: number): IProduct[][] {
    return this.cart.matrixCard(value)
  }
}
