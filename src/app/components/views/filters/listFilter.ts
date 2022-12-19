import { Element } from '../../element';
import { ListOption } from '../../../types/types';
import { ListFilters } from '../../../types/types';

export class ListFilter extends Element {
  constructor(parent: HTMLElement, filterName: ListFilters, filterOptions: ListOption) {
    super(parent, 'div', 'filters');
    const container = new Element(this.elem, 'div', `filters-${filterName}`);

    const upperWrapper = new Element(container.elem, 'div', `filter-${filterName}__upper-wrapper`);
    const name = new Element(upperWrapper.elem, 'span', `filters-${filterName}__name`, `${filterName}`);

    const bottomWrapper = new Element(container.elem, 'div', `filters-${filterName}__bottom-wrapper`);
    const list = new Element(bottomWrapper.elem, 'ul', `fiters-${filterName}__list`);

    for (const filterOption in filterOptions) {
      const option = new Element(list.elem, 'li', `filters-${filterName}__option`);

      const input = new Element(option.elem, 'input', `filters-${filterName}__checkbox`);
      input.elem.setAttribute('type', 'checkbox');
      input.elem.setAttribute('id', `${filterOption}`);

      const label = new Element(option.elem, 'label', `filters-${filterName}__label`, `${filterOption} (${filterOptions[filterOption].current}/${filterOptions[filterOption].full})`);
      label.elem.setAttribute('id', `${filterOption}`);
    }
  }
}
