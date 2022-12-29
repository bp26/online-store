import { Element } from '../../../element';
import { ListOptions } from '../../../../types/types';
import { ListFilterNames } from '../../../../types/types';
import { FiltersAction } from '../../../../types/enums';
import { FiltersCallback } from '../../../../types/types';
import { FiltersType } from '../../../../types/enums';

export class ListFilterView extends Element {
  private list: Element;
  constructor(parent: HTMLElement, filterName: ListFilterNames, filterOptions: ListOptions, callback: FiltersCallback) {
    super(parent, 'div', `filters-list filters-${filterName}`);

    const upperWrapper = new Element(this.elem, 'div', `filter-${filterName}__upper-wrapper`);
    const name = new Element(upperWrapper.elem, 'span', `filters-${filterName}__name`, `${filterName}`);

    const bottomWrapper = new Element(this.elem, 'div', `filters-${filterName}__bottom-wrapper`);
    this.list = new Element(bottomWrapper.elem, 'ul', `fiters-${filterName}__list`);

    this.renderOptions(filterName, filterOptions, callback);
  }

  public renderOptions(filterName: ListFilterNames, filterOptions: ListOptions, callback: FiltersCallback) {
    this.list.elem.innerHTML = '';
    for (const filterOption in filterOptions) {
      const option = new Element(this.list.elem, 'li', `filters-${filterName}__option`);

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
