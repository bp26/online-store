import { Element } from '../../../element';
import { HTMLTag } from '../../../../types/enums';
import { ToggleDisplayCallback } from '../../../../types/types';
import { ProductDisplay } from '../../../../types/enums';

export class ToggleDisplayView extends Element {
  constructor(parent: HTMLElement, callback: ToggleDisplayCallback) {
    super(parent, HTMLTag.DIV, 'products-header__view');

    const simpleButton = new Element(this.elem, HTMLTag.BUTTON, 'products-header__simple-button', ProductDisplay.SIMPLE);
    const detailedButton = new Element(this.elem, HTMLTag.BUTTON, 'products-header__detailed-button', ProductDisplay.DETAILED);

    simpleButton.elem.onclick = () => callback(ProductDisplay.SIMPLE);
    detailedButton.elem.onclick = () => callback(ProductDisplay.DETAILED);
  }
}
