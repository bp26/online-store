import { Element } from '../../../element';
import { ListOptions } from '../../../../types/types';
import { ListFilterNames } from '../../../../types/types';
import { FiltersAction } from '../../../../types/enums';
import { FiltersCallback } from '../../../../types/types';
import { FiltersType } from '../../../../types/enums';

export class ListFilterView extends Element {
  private list: Element;
  constructor(parent: HTMLElement, filterName: ListFilterNames, filterOptions: ListOptions, callback: FiltersCallback) {
    super(parent, 'div', `filters-list`);

    const upperWrapper = new Element(this.elem, 'div', `filter-list__upper-wrapper`);
    const name = new Element(upperWrapper.elem, 'span', `filters-list__name`, `${filterName}`);

    const bottomWrapper = new Element(this.elem, 'div', `filters-list__bottom-wrapper`);
    this.list = new Element(bottomWrapper.elem, 'ul', `fiters-list__list`);

    this.renderOptions(filterName, filterOptions, callback);
  }

  public renderOptions(filterName: ListFilterNames, filterOptions: ListOptions, callback: FiltersCallback) {
    this.list.elem.innerHTML = '';
    for (const filterOption in filterOptions) {
      const option = new Element(this.list.elem, 'li', `filters-list__option`);

      const input = new Element(option.elem, 'input', `filters-list__checkbox`);
      input.elem.setAttribute('type', 'checkbox');
      (input.elem as HTMLInputElement).checked = filterOptions[filterOption].isChecked;
      input.elem.setAttribute('id', `${filterOption}`);
      input.elem.oninput = () => {
        callback(FiltersAction.filter, { type: FiltersType[filterName], filter: filterOption });
      };

      const label = new Element(option.elem, 'label', `filters-list__label`, `${filterOption}`);
      label.elem.setAttribute('id', `${filterOption}`);

      const span = new Element(option.elem, 'span', `filters-list__count`, `${filterOptions[filterOption].current}/${filterOptions[filterOption].full}`);
    }
  }
}
