import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';
import { VALUE_TIMER } from '../../../utils/constants';

export class resetModalView extends Element {
  private count: number;
  private text: Element;
  constructor(node: Element, mountProductsPage: () => void) {
    super(node.elem, HTMLTag.DIV, 'wrapper-reset');
    this.count = VALUE_TIMER;
    this.text = new Element(this.elem, HTMLTag.DIV, 'reset-content', `Thanks for your order. Redirect to the store after ${this.count} sec`);

    const interval = setInterval(() => {
      this.count -= 1;
      this.text.elem.textContent = `Thanks for your order. Redirect to the store after ${this.count} sec`;
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setTimeout(() => {
        node.destroy();
        mountProductsPage();
      }, 1000);
    }, 5000);
  }
}
