import { Element } from '../../element';
import { ListOptions } from '../../../types/types';
import { ListFilters } from '../../../types/types';
import { FiltersAction } from '../../../types/enums';
import { FiltersCallback } from '../../../types/types';
import { FiltersType } from '../../../types/enums';

export class ListFiltersView extends Element {
  constructor(parent: HTMLElement, filterName: ListFilters, filterOptions: ListOptions, callback: FiltersCallback) {
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
      (input.elem as HTMLInputElement).checked = filterOptions[filterOption].isChecked;
      input.elem.setAttribute('id', `${filterOption}`);
      input.elem.oninput = () => {
        callback(FiltersAction.filter, { type: FiltersType[filterName], filter: filterOption });
      };

      const label = new Element(option.elem, 'label', `filters-${filterName}__label`, `${filterOption}`);
      label.elem.setAttribute('id', `${filterOption}`);

      const span = new Element(option.elem, 'span', `filters-${filterName}__count`, `${filterOptions[filterOption].current}/${filterOptions[filterOption].full}`);
    }
  }
}
