import { ProductsData } from '../../types/types';
import products from '../../../assets/data/products';

export class Model {
  data: ProductsData;
  constructor() {
    this.data = products;
  }

  getData(): ProductsData {
    return this.data;
  }
}
