import { Element } from '../../../element';
import { IFilterOptions } from '../../../../types/interfaces';
import { ListFilterView } from './listFilterView';
import { CountFilterView } from './countFilterView';
import { FiltersCallback } from '../../../../types/types';
import { FiltersAction } from '../../../../types/enums';
import { FiltersType } from '../../../../types/enums';
import { HTMLTag } from '../../../../types/enums';

export class FiltersView extends Element {
  private categoryFilter: ListFilterView;
  private brandFilter: ListFilterView;
  private priceFilter: CountFilterView;
  private stockFilter: CountFilterView;
  constructor(parent: HTMLElement, options: IFilterOptions, callback: FiltersCallback) {
    super(parent, HTMLTag.DIV, 'filters');
    const { category, brand, price, stock } = options;

    const resetButton = new Element(this.elem, HTMLTag.BUTTON, 'filters__button active-button', 'Reset');
    resetButton.elem.onclick = () => callback(FiltersAction.RESET);

    this.categoryFilter = new ListFilterView(this.elem, FiltersType.category, category, callback);
    this.brandFilter = new ListFilterView(this.elem, FiltersType.brand, brand, callback);
    this.priceFilter = new CountFilterView(this.elem, FiltersType.price, price, callback);
    this.stockFilter = new CountFilterView(this.elem, FiltersType.stock, stock, callback);
  }

  public update(options: IFilterOptions, callback: FiltersCallback): void {
    const { category, brand, price, stock } = options;
    this.categoryFilter.renderOptions(FiltersType.category, category, callback);
    this.brandFilter.renderOptions(FiltersType.brand, brand, callback);
    this.priceFilter.update(price);
    this.stockFilter.update(stock);
  }
}
