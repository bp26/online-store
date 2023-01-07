import { HTMLTag } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputCardCvv extends Element {
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');
    const titleBlockCvvIgnor = new Element(node, HTMLTag.P, 'block-cvv__title', 'CVV');

    const conditionInvalidValue = new RegExp('[a-zа-ё[\\]{\\}(\\)\\s\\\\/!?.,_;:|`\'"#№$%^&*@=+-]', 'gi');
    const conditionValidValue = new RegExp('^\\d{3}$', 'g');

    const inputCardNumber = new Element(node, HTMLTag.INPUT, 'block-cvv__input');
    const inputCardNumberElem = <HTMLInputElement>inputCardNumber.elem;
    inputCardNumberElem.setAttribute('type', 'text');
    inputCardNumberElem.setAttribute('title', 'Код должен состоять из 3 цифр');
    inputCardNumberElem.setAttribute('placeholder', 'Cvv');
    inputCardNumberElem.setAttribute('maxlength', '3');

    inputCardNumberElem.oninput = () => {
      if (conditionInvalidValue.test(inputCardNumberElem.value)) {
        inputCardNumberElem.value = inputCardNumberElem.value.replace(conditionInvalidValue, '');
      }
    };

    inputCardNumberElem.onchange = () => {
      if (conditionValidValue.test(inputCardNumberElem.value)) {
        inputCardNumberElem.classList.remove('invalid');
        inputCardNumberElem.classList.add('valid');
      } else {
        inputCardNumberElem.classList.remove('valid');
        inputCardNumberElem.classList.add('invalid');
      }
    };
  }
}
