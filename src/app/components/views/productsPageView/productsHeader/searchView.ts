import { Element } from '../../../element';
import { HTMLTag } from '../../../../types/enums';
import { SearchCallback } from '../../../../types/types';
import { SEARCH_PLACEHOLDER } from '../../../../utils/constants';

export class SearchView extends Element {
  constructor(parent: HTMLElement, callback: SearchCallback) {
    super(parent, HTMLTag.INPUT, 'products-header__search');

    const input = this.elem;

    if (!(input instanceof HTMLInputElement)) {
      throw new Error();
    }

    input.placeholder = SEARCH_PLACEHOLDER;

    input.oninput = () => {
      input.value = input.value.toLowerCase();
      callback(input.value);
    };
  }
}
