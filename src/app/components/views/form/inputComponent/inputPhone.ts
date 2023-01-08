import { HTMLTag, InfoForUser } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputPhone extends Element {
  public valid: boolean;
  private inputPhoneElem: HTMLInputElement;
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');
    this.valid = false;
    const conditionInvalidValue = new RegExp('[a-zа-ё[\\]{\\}(\\)\\\\!?.,_;<>:|/`\'"#№$%^&*@=-]', 'gi');

    const inputPhone = new Element(this.elem, HTMLTag.INPUT, 'form__input-phone');
    this.inputPhoneElem = <HTMLInputElement>inputPhone.elem;
    this.inputPhoneElem.setAttribute('type', 'tel');
    this.inputPhoneElem.setAttribute('title', InfoForUser.INPUT_PHONE);
    this.inputPhoneElem.setAttribute('placeholder', 'Phone number');

    this.inputPhoneElem.oninput = () => {
      if (conditionInvalidValue.test(this.inputPhoneElem.value)) {
        this.inputPhoneElem.value = this.inputPhoneElem.value.replace(conditionInvalidValue, '');
      }
    };

    this.inputPhoneElem.onchange = () => {
      this.validation();
    };
  }

  public validation(): void {
    if (/^[+](\d(\s+)?){9,}$/.test(this.inputPhoneElem.value)) {
      this.inputPhoneElem.classList.remove('invalid');
      this.inputPhoneElem.classList.add('valid');
      this.valid = true;
    } else {
      this.inputPhoneElem.classList.remove('valid');
      this.inputPhoneElem.classList.add('invalid');
      this.valid = false;
    }
  }
}
