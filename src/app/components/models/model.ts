import { ProductsData } from '../../types/types';
import products from '../../../assets/data/products';
import { Cart } from './cart';

export class Model {
  readonly data: ProductsData;
  readonly cart: Cart;

  constructor() {
    this.data = products;
    this.cart = new Cart();
  }

  getData(): ProductsData {
    return this.data;
  }
}
