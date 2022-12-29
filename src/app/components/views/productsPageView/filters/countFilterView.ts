import { Element } from '../../../element';
import { FilterSlider } from './filterSlider';
import { CountOptions } from '../../../../types/types';
import { CountFilterNames } from '../../../../types/types';
import { FiltersAction } from '../../../../types/enums';
import { FiltersCallback } from '../../../../types/types';
import { FiltersType } from '../../../../types/enums';

export class CountFilterView extends Element {
  private sliderOne: FilterSlider;
  private sliderTwo: FilterSlider;
  private emptyValue: Element;
  private minValue: Element;
  private maxValue: Element;

  constructor(parent: HTMLElement, filterName: CountFilterNames, options: CountOptions, callback: FiltersCallback) {
    super(parent, 'div', `filters-${filterName}`);

    const valuesContainer = new Element(this.elem, 'div', `filters-${filterName}__values-container`);
    this.emptyValue = new Element(valuesContainer.elem, 'p', `filters-${filterName}__empty-value`, 'NOT FOUND');
    this.minValue = new Element(valuesContainer.elem, 'div', `filters-${filterName}__value`, `${options.min}`);
    this.maxValue = new Element(valuesContainer.elem, 'div', `filters-${filterName}__value`, `${options.max}`);
    this.toggleValues(options);

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

  private getSliderValues(): [number, number] {
    const valueOne = this.sliderOne.getValue();
    const valueTwo = this.sliderTwo.getValue();
    return [valueOne, valueTwo];
  }

  private toggleValues(options: CountOptions): void {
    this.emptyValue.elem.style.display = options.isEmpty ? 'block' : 'none';
    this.minValue.elem.style.display = options.isEmpty ? 'none' : 'block';
    this.maxValue.elem.style.display = options.isEmpty ? 'none' : 'block';
  }

  private setValues(options: CountOptions) {
    this.minValue.elem.textContent = `${options.min}`;
    this.maxValue.elem.textContent = `${options.max}`;
    if (!options.isActive) {
      this.setSliderValues(options);
    }
  }

  private setSliderValues(options: CountOptions): void {
    const isSliderOneGreater = this.sliderOne.getValue() >= this.sliderTwo.getValue();
    this.sliderOne.setValue(isSliderOneGreater ? options.max : options.min);
    this.sliderTwo.setValue(isSliderOneGreater ? options.min : options.max);
  }

  public update(options: CountOptions): void {
    this.toggleValues(options);
    this.setValues(options);
  }
}
