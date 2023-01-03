import { Element } from '../../../element';
import { HTMLTag } from '../../../../types/enums';
import { SortType } from '../../../../types/enums';

export class SortView extends Element {
  constructor(parent: HTMLElement, type: SortType) {
    super(parent, HTMLTag.DIV, 'products-header__sort');

    const dropbtn = new Element(this.elem, HTMLTag.DIV, 'products-header__dropbtn', type);

    const droplist = new Element(this.elem, HTMLTag.DIV, 'products-header__droplist products-header__droplist_hidden');

    Object.values(SortType).forEach((option) => {
      const dropoption = new Element(droplist.elem, HTMLTag.DIV, 'products-header__dropoption', option);
      dropoption.elem.onclick = () => {
        dropbtn.elem.textContent = option;
      };
    });
  }
}
