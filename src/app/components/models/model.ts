import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { products } from '../../../assets/data/products';
import { binarySearch } from '../../utils/binarySearch'
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
    console.log(this.cart.list)
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

  getDataCart(): IProduct[] {
    const dataCart = this.cart.getCartList()
    const dataCartKeys: string[] = Object.keys(dataCart)
    const arrayProduct: IProduct[] = []
    for (let i = 0; i < dataCartKeys.length; i += 1) {
      arrayProduct.push(binarySearch(products, +dataCartKeys[i]))
    }
    return arrayProduct
  }
}
