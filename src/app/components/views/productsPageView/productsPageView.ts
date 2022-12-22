import { Element } from '../../element';
import { ProductsView } from '../productsView';
import { FiltersView } from '../filters/filtersView';
import { IProductsPageData } from '../../../types/interfaces';
import { IProductsPageCallbacks } from '../../../types/interfaces';

export class ProductsPageView extends Element {
  filters: FiltersView;
  products: ProductsView;
  constructor(parent: HTMLElement, initData: IProductsPageData, callbacks: IProductsPageCallbacks) {
    super(parent, 'div', 'main-products');

    const { data, filterOptions } = initData;
    const { productsCallback, filtersCallback } = callbacks;

    this.filters = new FiltersView(this.elem, filterOptions, filtersCallback);
    this.products = new ProductsView(this.elem, data, productsCallback);
  }

  public updateOnFilter(initData: IProductsPageData, callbacks: IProductsPageCallbacks): void {
    const { data, filterOptions } = initData;
    const { productsCallback, filtersCallback } = callbacks;

    this.products.renderProducts(data, productsCallback);
  }
}
