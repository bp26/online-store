import { Element } from '../../element';
import { FilterSlider } from './filterSlider';
import { CountOptions } from '../../../types/types';
import { CountFilterNames } from '../../../types/types';
import { FiltersAction } from '../../../types/enums';
import { FiltersCallback } from '../../../types/types';
import { FiltersType } from '../../../types/enums';

export class CountFiltersView extends Element {
  sliderOne: FilterSlider;
  sliderTwo: FilterSlider;
  minValue: Element;
  maxValue: Element;
  constructor(parent: HTMLElement, filterName: CountFilterNames, options: CountOptions, callback: FiltersCallback) {
    super(parent, 'div', `filters-${filterName}`);

    const valuesContainer = new Element(this.elem, 'div', `filters-${filterName}__values-container`);
    this.minValue = new Element(valuesContainer.elem, 'div', `filters-${filterName}__value`, `${options.min}`);
    this.maxValue = new Element(valuesContainer.elem, 'div', `filters-${filterName}__value`, `${options.max}`);

    const slidersContainer = new Element(this.elem, 'div', `filters-${filterName}__sliders-container`);
    this.sliderOne = new FilterSlider(slidersContainer.elem, `filters-${filterName}__slider`, options.start, options.end, options.min);
    this.sliderTwo = new FilterSlider(slidersContainer.elem, `filters-${filterName}__slider`, options.start, options.end, options.max);

    this.sliderOne.elem.oninput = () => {
      callback(FiltersAction.filter, { type: FiltersType[filterName], filter: this.getSliderValues() });
    };
    this.sliderTwo.elem.oninput = () => {
      callback(FiltersAction.filter, { type: FiltersType[filterName], filter: this.getSliderValues() });
    };
  }

  private getSliderValues(): [string, string] {
    const valueOne = this.sliderOne.getValue();
    const valueTwo = this.sliderTwo.getValue();
    return [valueOne, valueTwo];
  }

  public update(options: CountOptions): void {
    this.minValue.elem.textContent = `${options.min}`;
    this.maxValue.elem.textContent = `${options.max}`;
    if (!options.isActive) {
      this.sliderOne.setValue(options.min);
      this.sliderTwo.setValue(options.max);
    }
  }
}
