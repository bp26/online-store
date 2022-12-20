import { Element } from '../../element';
import { IFilterOptions } from '../../../types/interfaces';
import { ListFilter } from './listFilter';
import { FiltersCallback } from '../../../types/types';

export class FiltersView extends Element {
  constructor(parent: HTMLElement, options: IFilterOptions, callback: FiltersCallback) {
    super(parent, 'div', 'filters');
    const { category, brand, price, stock } = options;
    const categoryFilter = new ListFilter(this.elem, 'category', category, callback);
    const brandFilter = new ListFilter(this.elem, 'brand', brand, callback);
  }
}
