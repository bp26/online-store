import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';
import { IProduct } from '../../../types/interfaces';
import { DETAILS_INFO_LIST } from '../../../utils/constants';

export class DetailsInfoView extends Element {
  constructor(parent: HTMLElement, productData: IProduct) {
    super(parent, HTMLTag.DIV, 'details-page__product-info product-info');

    DETAILS_INFO_LIST.forEach((item) => {
      const container = new Element(this.elem, HTMLTag.DIV, 'product-info__container');
      const title = new Element(container.elem, HTMLTag.DIV, 'product-info__title', `${item[0].toUpperCase() + item.slice(1)}:`);
      const information = new Element(container.elem, HTMLTag.P, 'product-info__info', String(productData[item]));
    });
  }
}
