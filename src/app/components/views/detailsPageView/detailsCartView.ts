import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';
import { DetailsAction } from '../../../types/enums';
import { DetailsCallback } from '../../../types/types';

export class DetailsCartView extends Element {
  constructor(parent: HTMLElement, id: number, productPrice: number, inCart: boolean, callback: DetailsCallback) {
    super(parent, HTMLTag.DIV, 'details-page__details-cart details-cart');

    const price = new Element(this.elem, HTMLTag.SPAN, 'details-cart__price', `€${productPrice}`);

    const addButton = new Element(this.elem, HTMLTag.BUTTON, 'details-cart__button', 'ADD');
    addButton.elem.onclick = () => callback(DetailsAction.ADD, id, productPrice);

    const buyButton = new Element(this.elem, HTMLTag.BUTTON, 'details-cart__button', 'BUY NOW');
    buyButton.elem.onclick = () => callback(DetailsAction.BUY, id, productPrice);
  }
}
