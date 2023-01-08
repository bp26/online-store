import { HTMLTag, InfoForUser } from '../../../../types/enums';
import { Element } from '../../../element';
import { MASTERCARD_IMG, VISA_IMG, AMERICAN_EXPRESS_IMG } from '../../../../utils/constants';

export class InputCardNumber extends Element {
  public valid: boolean;
  private inputCardNumberElem: HTMLInputElement;
  private conditionValidValue: RegExp;
  constructor(node: HTMLElement, logo: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label-card');
    this.valid = false;
    const conditionInvalidValue = new RegExp('[a-zа-ё[\\]{\\}(\\)\\\\!?.,_;:|/`\'"#№$%^&*@=+-]', 'gi');
    this.conditionValidValue = new RegExp('^\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}$', 'g');
    const conditionValid = new RegExp('\\d{4}$', 'g');

    const inputCardNumber = new Element(this.elem, HTMLTag.INPUT, 'modal-card__number');
    this.inputCardNumberElem = <HTMLInputElement>inputCardNumber.elem;
    this.inputCardNumberElem.setAttribute('type', 'text');
    this.inputCardNumberElem.setAttribute('title', InfoForUser.INPUT_NUMBER);
    this.inputCardNumberElem.setAttribute('placeholder', 'Card number');
    this.inputCardNumberElem.setAttribute('maxlength', '19');
    this.inputCardNumberElem.oninput = () => {
      if (this.inputCardNumberElem.value.length === 1 || !this.inputCardNumberElem.value.length) {
        switch (this.inputCardNumberElem.value) {
          case '5':
            logo.style.backgroundImage = `url(${MASTERCARD_IMG})`;
            break;
          case '4':
            logo.style.backgroundImage = `url(${VISA_IMG})`;
            break;
          case '3':
            logo.style.backgroundImage = `url(${AMERICAN_EXPRESS_IMG})`;
            break;
          default:
            logo.style.backgroundImage = 'none';
        }
      }
      if (conditionInvalidValue.test(this.inputCardNumberElem.value)) {
        this.inputCardNumberElem.value = this.inputCardNumberElem.value.replace(conditionInvalidValue, '');
      }
      if (conditionValid.test(this.inputCardNumberElem.value) && !/^(\d{4}\s){3}\d{4}$/.test(this.inputCardNumberElem.value)) {
        const val = this.inputCardNumberElem.value;
        this.inputCardNumberElem.value = `${val} `;
      }
    };

    this.inputCardNumberElem.onchange = () => {
      this.validation();
    };
  }

  public validation(): void {
    if (this.conditionValidValue.test(this.inputCardNumberElem.value)) {
      this.inputCardNumberElem.classList.add('valid');
      this.valid = true;
    } else {
      this.inputCardNumberElem.classList.add('invalid');
      this.valid = false;
    }
  }
}
