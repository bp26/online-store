import { HTMLTag } from '../../../../types/enums';
import { Element } from '../../../element';
import { MASTERCARD_IMG, VISA_IMG, AMERICAN_EXPRESS_IMG } from '../../../../utils/constants';

export class InputCardNumber extends Element {
  constructor(node: HTMLElement, logo: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');
    const conditionInvalidValue = new RegExp('[a-zа-ё[\\]{\\}(\\)\\\\!?.,_;:|/`\'"#№$%^&*@=+-]', 'gi');
    const conditionValidValue = new RegExp('^\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}$', 'g');
    const conditionValid = new RegExp('\\d{4}$', 'g');

    const inputCardNumber = new Element(node, HTMLTag.INPUT, 'modal-card__number');
    const inputCardNumberElem = <HTMLInputElement>inputCardNumber.elem;
    inputCardNumberElem.setAttribute('type', 'text');
    inputCardNumberElem.setAttribute('title', 'Номер должен состоять из 16 цифр');
    inputCardNumberElem.setAttribute('placeholder', 'Card number');
    inputCardNumberElem.setAttribute('maxlength', '19');
    inputCardNumberElem.oninput = () => {
      if (inputCardNumberElem.value.length === 1 || !inputCardNumberElem.value.length) {
        switch (inputCardNumberElem.value) {
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
      if (conditionInvalidValue.test(inputCardNumberElem.value)) {
        inputCardNumberElem.value = inputCardNumberElem.value.replace(conditionInvalidValue, '');
      }
      if (conditionValid.test(inputCardNumberElem.value) && !/^(\d{4}\s){3}\d{4}$/.test(inputCardNumberElem.value)) {
        const val = inputCardNumberElem.value;
        inputCardNumberElem.value = `${val} `;
      }
    };

    inputCardNumberElem.onchange = () => {
      if (conditionValidValue.test(inputCardNumberElem.value)) {
        console.log(conditionValidValue.test(inputCardNumberElem.value), 'change', 'on');
        inputCardNumberElem.classList.remove('invalid');
        inputCardNumberElem.classList.add('valid');
      } else {
        inputCardNumberElem.classList.remove('valid');
        inputCardNumberElem.classList.add('invalid');
      }
    };
  }
}
