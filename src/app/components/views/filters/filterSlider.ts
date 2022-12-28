import { Element } from '../../element';

export class FilterSlider extends Element {
  constructor(parent: HTMLElement, className: string, min: number, max: number, value: number) {
    super(parent, 'input', className);
    this.elem.setAttribute('type', 'range');
    this.elem.setAttribute('min', `${min}`);
    this.elem.setAttribute('max', `${max}`);
    this.setValue(value);
  }

  public setValue(value: number): void {
    this.elem.setAttribute('value', `${value}`);
  }

  public getValue(): string {
    const value = this.elem.getAttribute('value');
    if (!value) {
      throw new Error('No slider value found!');
    }
    return value;
  }
}
