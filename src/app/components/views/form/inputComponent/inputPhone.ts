import { HTMLTag } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputPhone extends Element {
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');

    const conditionInvalidValue = new RegExp('[^+\\d]', 'gi');
    const conditionValidValue = new RegExp('^[+]\\d{9,}', 'g');

    const inputPhone = new Element(this.elem, HTMLTag.INPUT, 'form__input-phone');
    const inputPhoneElem = <HTMLInputElement>inputPhone.elem;
    inputPhoneElem.setAttribute('type', 'tel');
    inputPhoneElem.setAttribute('title', 'Номер должен содержать не менее 9 цифр и начинаться с "+"');
    inputPhoneElem.setAttribute('pattern', `${conditionValidValue}`);
    inputPhoneElem.setAttribute('placeholder', 'Phone number');

    inputPhoneElem.oninput = () => {
      if (conditionInvalidValue.test(inputPhoneElem.value)) {
        inputPhoneElem.value = inputPhoneElem.value.replace(conditionInvalidValue, '');
      }
    };

    inputPhoneElem.onchange = () => {
      if (conditionValidValue.test(inputPhoneElem.value)) {
        inputPhoneElem.classList.remove('invalid');
        inputPhoneElem.classList.add('valid');
      } else {
        inputPhoneElem.classList.remove('valid');
        inputPhoneElem.classList.add('invalid');
      }
    };
  }
}
