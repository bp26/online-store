import { ProductsData } from '../../types/types';
import products from '../../../assets/data/products';
import { Cart } from './cart';

export class Model {
  readonly data: ProductsData;
  readonly cart: Cart;
  openCart: Boolean;

  constructor() {
    this.data = products;
    this.cart = new Cart();
    this.openCart = false
  }

  getData(): ProductsData {
    return this.data;
  }
}
