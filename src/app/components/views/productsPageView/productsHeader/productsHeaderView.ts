import { Element } from '../../../element';
import { HTMLTag } from '../../../../types/enums';
import { SortView } from './sortView';
import { SearchView } from './searchView';
import { IProductsHeaderOptions } from '../../../../types/interfaces';
import { IProductsHeaderCallbacks } from '../../../../types/interfaces';

export class ProductsHeaderView extends Element {
  productsCount: Element;
  constructor(parent: HTMLElement, options: IProductsHeaderOptions, callbacks: IProductsHeaderCallbacks) {
    super(parent, HTMLTag.DIV, `products-header`);

    const { sortType, productsCount } = options;
    const { sortCallback, searchCallback, toggleViewCallback } = callbacks;

    const sortList = new SortView(this.elem, sortType, sortCallback);
    this.productsCount = new Element(this.elem, HTMLTag.SPAN, 'products-header__count', String(productsCount));
    const searchInput = new SearchView(this.elem, searchCallback);
    const viewToggle = new Element(this.elem, HTMLTag.DIV, 'products-header__view');
  }

  public updateCount(count: number): void {
    this.productsCount.elem.textContent = String(count);
  }
}
