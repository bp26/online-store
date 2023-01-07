import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';
import { IProduct } from '../../../types/interfaces';
import { BREADCRUMBS_LIST } from '../../../utils/constants';
import { BreadcrumbsElements } from '../../../types/enums';

export class BreadcrumbsView extends Element {
  constructor(parent: HTMLElement, productData: IProduct) {
    super(parent, HTMLTag.DIV, 'details-page__breadcrumbs breadcrumbs');

    const store = new Element(this.elem, HTMLTag.SPAN, 'breadcrumbs__item', BreadcrumbsElements.STORE);

    BREADCRUMBS_LIST.forEach((item) => {
      const separator = new Element(this.elem, HTMLTag.SPAN, 'breadcrumbs__separator', BreadcrumbsElements.SEPARATOR);
      const breadcrumb = new Element(this.elem, HTMLTag.SPAN, 'breadcrumbs__item', String(productData[item]));
    });
  }
}
