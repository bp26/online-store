import { Element } from '../../../element';
import { HTMLTag } from '../../../../types/enums';
import { SearchCallback } from '../../../../types/types';

export class SearchView extends Element {
  constructor(parent: HTMLElement, callback: SearchCallback) {
    super(parent, HTMLTag.INPUT, 'products-header__search');

    const input = this.elem;

    if (!(input instanceof HTMLInputElement)) {
      throw new Error();
    }

    input.oninput = () => {
      input.value = input.value.toLowerCase();
      callback(input.value);
    };
  }
}
