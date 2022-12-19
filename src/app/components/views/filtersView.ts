import { Element } from '../element';

export class FiltersView extends Element {
  constructor(parent: HTMLElement) {
    super(parent, 'div', 'filters');
  }

  private drawCategory(): void {
    const filterContainer = new Element(this.elem, 'div', 'filters-category');

    const filterNameContainer = new Element(filterContainer.elem, 'div', 'filter-category__nameContainer');
    const filterName = new Element(filterNameContainer.elem, 'span', 'filters-category__name');

    const filterList = new Element(filterContainer.elem, 'div', 'fiters-category__list');
  }
}
