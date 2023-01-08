import { HTMLTag, InfoForUser } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputAdress extends Element {
  public valid: boolean;
  private inputAdressElem: HTMLInputElement;
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');
    this.valid = false;

    const conditionInvalidValue = new RegExp('[-=+_?!,.;:\'"`[\\]{\\}(\\)]', 'g');

    const inputAdress = new Element(this.elem, HTMLTag.INPUT, 'form__input-adress');
    this.inputAdressElem = <HTMLInputElement>inputAdress.elem;
    this.inputAdressElem.setAttribute('type', 'text');
    this.inputAdressElem.setAttribute('title', InfoForUser.INPUT_ADRESS);
    this.inputAdressElem.setAttribute('placeholder', 'Adress');

    this.inputAdressElem.oninput = () => {
      if (conditionInvalidValue.test(this.inputAdressElem.value)) {
        this.inputAdressElem.value = this.inputAdressElem.value.replace(conditionInvalidValue, '');
      }
    };

    this.inputAdressElem.onchange = () => {
      this.validation();
    };
  }

  public validation(): void {
    if (/^(\w{5,}(\s+)?){3,}$/.test(this.inputAdressElem.value)) {
      this.inputAdressElem.classList.remove('invalid');
      this.inputAdressElem.classList.add('valid');
      this.valid = true;
    } else {
      this.inputAdressElem.classList.remove('valid');
      this.inputAdressElem.classList.add('invalid');
      this.valid = false;
    }
  }
}
