import { Element } from '../../../element';
import { IFilterOptions } from '../../../../types/interfaces';
import { ListFilterView } from './listFilterView';
import { CountFilterView } from './countFilterView';
import { FiltersCallback } from '../../../../types/types';

export class FiltersView extends Element {
  private categoryFilter: ListFilterView;
  private brandFilter: ListFilterView;
  private priceFilter: CountFilterView;
  private stockFilter: CountFilterView;
  constructor(parent: HTMLElement, options: IFilterOptions, callback: FiltersCallback) {
    super(parent, 'div', 'filters');
    const { category, brand, price, stock } = options;
    this.categoryFilter = new ListFilterView(this.elem, 'category', category, callback);
    this.brandFilter = new ListFilterView(this.elem, 'brand', brand, callback);
    this.priceFilter = new CountFilterView(this.elem, 'price', price, callback);
    this.stockFilter = new CountFilterView(this.elem, 'stock', stock, callback);
  }

  public update(options: IFilterOptions, callback: FiltersCallback): void {
    const { category, brand, price, stock } = options;
    this.categoryFilter.renderOptions('category', category, callback);
    this.brandFilter.renderOptions('brand', brand, callback);
    this.priceFilter.update(price);
    this.stockFilter.update(stock);
  }
}
