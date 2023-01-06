import { Element } from '../../../element';
import { HTMLTag } from '../../../../types/enums';
import { SortView } from './sortView';
import { SearchView } from './searchView';
import { ToggleDisplayView } from './toggleDisplayView';
import { IProductsHeaderOptions } from '../../../../types/interfaces';
import { IProductsHeaderCallbacks } from '../../../../types/interfaces';

export class ProductsHeaderView extends Element {
  productsCount: Element;
  constructor(parent: HTMLElement, options: IProductsHeaderOptions, callbacks: IProductsHeaderCallbacks) {
    super(parent, HTMLTag.DIV, `products-header`);

    const { sortType, productsCount } = options;
    const { sortCallback, searchCallback, toggleDisplayCallback } = callbacks;

    const sortList = new SortView(this.elem, sortType, sortCallback);
    this.productsCount = new Element(this.elem, HTMLTag.SPAN, 'products-header__count', `Found: ${String(productsCount)}`);
    const searchInput = new SearchView(this.elem, searchCallback);
    const viewToggle = new ToggleDisplayView(this.elem, toggleDisplayCallback);
  }

  public updateCount(count: number): void {
    this.productsCount.elem.textContent = `Found: ${String(count)}`;
  }
}
