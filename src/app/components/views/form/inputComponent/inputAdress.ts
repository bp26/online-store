import { HTMLTag } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputAdress extends Element {
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');

    const conditionInvalidValue = new RegExp('[-=+_?!,.;:\'"`[\\]{\\}(\\)]', 'g');
    const conditionValidValue = new RegExp('\\w{5,}\\s\\w{5,}\\s\\w{5,}[\\s\\w]', 'g');

    const inputAdress = new Element(this.elem, HTMLTag.INPUT, 'form__input-adress');
    const inputAdressElem = <HTMLInputElement>inputAdress.elem;
    inputAdressElem.setAttribute('type', 'text');
    inputAdressElem.setAttribute('pattern', `${conditionValidValue}`);
    inputAdressElem.setAttribute('title', 'Адрес должен иметь не меньше 3 слов по 5 символов каждый');
    inputAdressElem.setAttribute('placeholder', 'Adress');

    inputAdressElem.oninput = () => {
      if (conditionInvalidValue.test(inputAdressElem.value)) {
        inputAdressElem.value = inputAdressElem.value.replace(conditionInvalidValue, '');
      }
    };

    inputAdressElem.onchange = () => {
      if (conditionValidValue.test(inputAdressElem.value)) {
        inputAdressElem.classList.remove('invalid');
        inputAdressElem.classList.add('valid');
      } else {
        inputAdressElem.classList.remove('valid');
        inputAdressElem.classList.add('invalid');
      }
    };
  }
}
