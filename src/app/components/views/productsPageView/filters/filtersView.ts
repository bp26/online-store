import { Element } from '../../../element';
import { IFilterOptions } from '../../../../types/interfaces';
import { ListFiltersView } from './listFilterView';
import { CountFiltersView } from './countFilterView';
import { FiltersCallback } from '../../../../types/types';

export class FiltersView extends Element {
  private categoryFilter: ListFiltersView;
  private brandFilter: ListFiltersView;
  private priceFilter: CountFiltersView;
  private stockFilter: CountFiltersView;
  constructor(parent: HTMLElement, options: IFilterOptions, callback: FiltersCallback) {
    super(parent, 'div', 'filters');
    const { category, brand, price, stock } = options;
    this.categoryFilter = new ListFiltersView(this.elem, 'category', category, callback);
    this.brandFilter = new ListFiltersView(this.elem, 'brand', brand, callback);
    this.priceFilter = new CountFiltersView(this.elem, 'price', price, callback);
    this.stockFilter = new CountFiltersView(this.elem, 'stock', stock, callback);
  }

  public update(options: IFilterOptions, callback: FiltersCallback): void {
    const { category, brand, price, stock } = options;
    this.categoryFilter.renderOptions('category', category, callback);
    this.brandFilter.renderOptions('brand', brand, callback);
    this.priceFilter.update(price);
    this.stockFilter.update(stock);
  }
}
