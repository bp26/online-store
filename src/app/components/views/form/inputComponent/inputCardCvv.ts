import { HTMLTag } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputCardCvv extends Element {
  public valid: boolean;
  private inputCardNumberElem: HTMLInputElement;
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');
    this.valid = false;
    const titleBlockCvvIgnor = new Element(node, HTMLTag.P, 'block-cvv__title', 'CVV');

    const conditionInvalidValue = new RegExp('[a-zа-ё[\\]{\\}(\\)\\s\\\\/!?.,_;:|`\'"#№$%^&*@=+-]', 'gi');

    const inputCardNumber = new Element(node, HTMLTag.INPUT, 'block-cvv__input');
    this.inputCardNumberElem = <HTMLInputElement>inputCardNumber.elem;
    this.inputCardNumberElem.setAttribute('type', 'text');
    this.inputCardNumberElem.setAttribute('title', 'Код должен состоять из 3 цифр');
    this.inputCardNumberElem.setAttribute('placeholder', 'Cvv');
    this.inputCardNumberElem.setAttribute('maxlength', '3');

    this.inputCardNumberElem.oninput = () => {
      if (conditionInvalidValue.test(this.inputCardNumberElem.value)) {
        this.inputCardNumberElem.value = this.inputCardNumberElem.value.replace(conditionInvalidValue, '');
      }
    };

    this.inputCardNumberElem.onchange = () => {
      this.validation();
    };
  }

  public validation(): void {
    if (/^\d{3}$/.test(this.inputCardNumberElem.value)) {
      this.inputCardNumberElem.classList.remove('invalid');
      this.inputCardNumberElem.classList.add('valid');
      this.valid = true;
    } else {
      this.inputCardNumberElem.classList.remove('valid');
      this.inputCardNumberElem.classList.add('invalid');
      this.valid = false;
    }
  }
}
