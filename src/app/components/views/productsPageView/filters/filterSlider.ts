import { Element } from '../../../element';
import { HTMLTag } from '../../../../types/enums';

export class FilterSlider extends Element {
  constructor(parent: HTMLElement, className: string, min: number, max: number, value: number) {
    super(parent, HTMLTag.INPUT, className);
    this.elem.setAttribute('type', 'range');
    this.elem.setAttribute('min', `${min}`);
    this.elem.setAttribute('max', `${max}`);
    this.setValue(value);
  }

  public setValue(value: number): void {
    if (!(this.elem instanceof HTMLInputElement)) {
      throw new Error();
    }
    this.elem.value = `${value}`;
  }

  public getValue(): number {
    if (!(this.elem instanceof HTMLInputElement)) {
      throw new Error();
    }
    const value = this.elem.value;
    return +value;
  }
}
