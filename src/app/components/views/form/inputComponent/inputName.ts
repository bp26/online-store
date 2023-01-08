import { HTMLTag, InfoForUser } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputName extends Element {
  public valid: boolean;
  private inputNameElem: HTMLInputElement;
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');
    this.valid = false;
    const conditionInvalidValue = new RegExp('\\d', 'g');

    const inputName = new Element(this.elem, HTMLTag.INPUT, 'form__input');
    this.inputNameElem = <HTMLInputElement>inputName.elem;
    this.inputNameElem.setAttribute('type', 'text');
    this.inputNameElem.setAttribute('placeholder', 'Name');
    this.inputNameElem.setAttribute('title', InfoForUser.INPUT_NAME);
    this.inputNameElem.oninput = () => {
      if (conditionInvalidValue.test(this.inputNameElem.value)) {
        this.inputNameElem.value = this.inputNameElem.value.replace(conditionInvalidValue, '');
      }
    };

    this.inputNameElem.onchange = () => {
      this.validation();
    };
  }

  public validation(): void {
    if (/\w{3,}\s\w{3,}[\s\w]+/.test(this.inputNameElem.value)) {
      this.inputNameElem.classList.remove('invalid');
      this.valid = true;
    } else {
      this.inputNameElem.classList.add('invalid');
      this.valid = false;
    }
  }
}
