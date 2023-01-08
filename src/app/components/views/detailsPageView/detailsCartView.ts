import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';
import { DetailsAction } from '../../../types/enums';
import { DetailsCallback } from '../../../types/types';
import { CardButtonTitles } from '../../../types/enums';

export class DetailsCartView extends Element {
  constructor(parent: HTMLElement, id: number, productPrice: number, private inCart: boolean, callback: DetailsCallback) {
    super(parent, HTMLTag.DIV, 'details-page__details-cart details-cart');

    const price = new Element(this.elem, HTMLTag.SPAN, 'details-cart__price', `€${productPrice}`);

    const addButton = new Element(this.elem, HTMLTag.BUTTON, 'details-cart__button', 'ADD');
    addButton.elem.onclick = () => {
      callback(DetailsAction.ADD, id, productPrice);
      this.inCart = !this.inCart;
      this.setCartDisplay(addButton.elem);
    };

    const buyButton = new Element(this.elem, HTMLTag.BUTTON, 'details-cart__button', CardButtonTitles.BUY);
    buyButton.elem.onclick = () => callback(DetailsAction.BUY, id, productPrice);
  }

  private setCartDisplay(addButton: HTMLElement): void {
    if (this.inCart) {
      addButton.textContent = CardButtonTitles.REMOVE;
    } else {
      addButton.textContent = CardButtonTitles.ADD;
    }
  }
}
