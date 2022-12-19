import { Element } from '../../element';
import { IFilterOptions } from '../../../types/interfaces';
import { ListFilter } from './listFilter';

export class FiltersView extends Element {
  constructor(parent: HTMLElement, filterOptions: IFilterOptions) {
    super(parent, 'div', 'filters');
    const { category, brand, price, stock } = filterOptions;
    const categoryFilter = new ListFilter(this.elem, 'category', category);
    const brandFilter = new ListFilter(this.elem, 'brand', brand);
  }
}
