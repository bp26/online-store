import { Element } from '../../../element';
import { HTMLTag } from '../../../../types/enums';
import { SortType } from '../../../../types/enums';
import { SortCallback } from '../../../../types/types';

export class SortView extends Element {
  constructor(parent: HTMLElement, type: SortType, callback: SortCallback) {
    super(parent, HTMLTag.DIV, 'products-header__sort');

    const dropbtn = new Element(this.elem, HTMLTag.DIV, 'products-header__dropbtn', type);
    const droplist = new Element(this.elem, HTMLTag.UL, 'products-header__droplist');

    Object.values(SortType).forEach((option) => {
      const dropoption = new Element(droplist.elem, HTMLTag.LI, 'products-header__dropoption', option);
      dropoption.elem.onclick = () => {
        dropbtn.elem.textContent = option;
        droplist.elem.classList.remove('products-header__droplist_visible');
        callback(option);
      };
    });

    dropbtn.elem.onclick = () => {
      droplist.elem.classList.toggle('products-header__droplist_visible');
    };

    document.body.onclick = (e) => {
      if (!(e.target instanceof HTMLElement)) {
        throw new Error();
      }

      if (!this.elem.contains(e.target)) {
        droplist.elem.classList.remove('products-header__droplist_visible');
      }
    };
  }
}
