import { HTMLTag } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputCardDate extends Element {
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');
    const titleBlockDateIgnor = new Element(node, HTMLTag.P, 'block-date__title', 'Date');

    const conditionInvalidValue = new RegExp('[a-zа-ё[\\]{\\}(\\)\\s\\\\!?.,_;:|`\'"#№$%^&*@=+-]', 'gi');
    const conditionValidValue = new RegExp('^((([1-2][0-9])|([3][0-1]))/(([0][0-9])|([1][0-2])))$', 'g');
    const conditionValid = new RegExp('\\d{2}$', 'g');

    const inputCardNumber = new Element(node, HTMLTag.INPUT, 'block-date__input');
    const inputCardNumberElem = <HTMLInputElement>inputCardNumber.elem;
    inputCardNumberElem.setAttribute('type', 'text');
    inputCardNumberElem.setAttribute('title', 'Дата должна быть корректной');
    inputCardNumberElem.setAttribute('placeholder', 'Date');
    inputCardNumberElem.setAttribute('maxlength', '5');

    inputCardNumberElem.oninput = () => {
      if (conditionInvalidValue.test(inputCardNumberElem.value)) {
        inputCardNumberElem.value = inputCardNumberElem.value.replace(conditionInvalidValue, '');
      }
      if (conditionValid.test(inputCardNumberElem.value) && !/^(\d{2}\/\d{2})$/.test(inputCardNumberElem.value)) {
        const val = inputCardNumberElem.value;
        inputCardNumberElem.value = `${val}/`;
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
