import { Element } from '../element';
import { HTMLTag } from '../../types/enums';

export class PreloaderView extends Element {
  constructor() {
    super(document.body, HTMLTag.DIV, 'preloader');
    const preloadcircle = new Element(this.elem, 'div', 'preloader__circle');
  }
}
