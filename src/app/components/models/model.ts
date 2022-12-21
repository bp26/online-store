import { ProductsData } from '../../types/types';
import products from '../../../assets/data/products';
import { Cart } from './cart';
import { Filter } from './filter';
import { IProductsPageData } from '../../types/interfaces';

export class Model {
  readonly data: ProductsData;
  readonly cart: Cart;
  readonly filter: Filter;

  constructor() {
    this.data = products;
    this.cart = new Cart();
    this.filter = new Filter();
  }

  private getData(): ProductsData {
    return this.data;
  }

  public getProductsPageData(): IProductsPageData {
    const initialData = this.getData();
    const transData = this.filter.filterData(initialData);
    const filterOptions = this.filter.setFilterOptions(initialData, transData);
    return {
      data: transData,
      filterOptions: filterOptions,
    };
  }
}
