import { ProductsData } from '../../types/types';
import products from '../../data/products.json';

export class Model {
  data: ProductsData;
  constructor() {
    this.data = products;
  }

  getData(): ProductsData {
    return this.data;
  }
}
