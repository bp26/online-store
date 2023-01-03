import { Element } from '../../../element';
import { HTMLTag } from '../../../../types/enums';
import { SortView } from './sortView';

export class ProductsHeaderView extends Element {
  productsCount: Element;
  constructor(parent: HTMLElement) {
    super(parent, HTMLTag.DIV, `products-header`);

    //const sortList = new SortView(this.elem);
    this.productsCount = new Element(this.elem, HTMLTag.SPAN, 'products-header__count');
    const searchInput = new Element(this.elem, HTMLTag.INPUT, 'products-header__search');
    const viewToggle = new Element(this.elem, HTMLTag.DIV, 'products-header__view');
  }

  public updateCount(count: number): void {
    this.productsCount.elem.textContent = count + '';
  }
}
