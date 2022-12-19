import { ProductsData } from '../../types/types';
import products from '../../../assets/data/products';
import { Cart } from './cart';
import { Filter } from './filter';
import { IFilterOptions } from '../../types/interfaces';

export class Model {
  readonly data: ProductsData;
  readonly cart: Cart;
  readonly filter: Filter;

  constructor() {
    this.data = products;
    this.cart = new Cart();
    this.filter = new Filter();
  }

  public getData(): ProductsData {
    return this.data;
  }

  public getFilterOptions(): IFilterOptions {
    return this.filter.setFilterOptions(this.getData(), this.getData());
  }
}
