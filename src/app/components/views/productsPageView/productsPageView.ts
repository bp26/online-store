import { Element } from '../../element';
import { ProductsView } from './products/productsView';
import { FiltersView } from './filters/filtersView';
import { ProductsHeaderView } from './productsHeader/productsHeaderView';
import { IProductsPageData } from '../../../types/interfaces';
import { IProductsPageCallbacks } from '../../../types/interfaces';
import { HTMLTag, ProductDisplay } from '../../../types/enums';

export class ProductsPageView extends Element {
  private filters: FiltersView;
  private products: ProductsView;
  private header: ProductsHeaderView;
  constructor(parent: HTMLElement, initData: IProductsPageData, callbacks: IProductsPageCallbacks) {
    super(parent, HTMLTag.DIV, 'products-page');

    const { productsOptions, filterOptions, headerOptions } = initData;
    const { productsCallback, filtersCallback, headerCallback } = callbacks;

    this.filters = new FiltersView(this.elem, filterOptions, filtersCallback);

    const wrapper = new Element(this.elem, HTMLTag.DIV, 'products-page__wrapper');
    this.header = new ProductsHeaderView(wrapper.elem, headerOptions, headerCallback);
    this.products = new ProductsView(wrapper.elem, productsOptions, productsCallback);
  }

  public updateOnFilterSearch(initData: IProductsPageData, callbacks: IProductsPageCallbacks): void {
    const { productsOptions, filterOptions, headerOptions } = initData;
    const { productsCallback, filtersCallback } = callbacks;

    this.products.renderProducts(productsOptions, productsCallback);
    this.filters.update(filterOptions, filtersCallback);
    this.header.updateCount(headerOptions.productsCount);
  }

  public updateOnSort(initData: IProductsPageData, callbacks: IProductsPageCallbacks) {
    const { productsOptions } = initData;
    const { productsCallback } = callbacks;

    this.products.renderProducts(productsOptions, productsCallback);
  }

  public updateOnToggleDisplay(productDisplay: ProductDisplay) {
    this.products.toggleDisplay(productDisplay);
  }
}
