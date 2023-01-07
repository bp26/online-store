import { HTMLTag } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputMail extends Element {
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');

    const conditionInvalidValue = new RegExp('[[\\]{\\}(\\)!?,_=+-]', 'g');

    const inputMail = new Element(this.elem, HTMLTag.INPUT, 'form__input-mail');
    const inputMailElem = <HTMLInputElement>inputMail.elem;
    inputMailElem.setAttribute('type', 'email');
    inputMailElem.setAttribute('title', 'E-mail должен быть корректным');
    inputMailElem.setAttribute('placeholder', 'E-mail');

    inputMailElem.oninput = () => {
      if (conditionInvalidValue.test(inputMailElem.value)) {
        inputMailElem.value = inputMailElem.value.replace(conditionInvalidValue, '');
      }
    };

    inputMailElem.onchange = () => {
      if (/^(\w+[.]?\w+)+[@]\w+[.]\w{0,5}$/.test(inputMailElem.value)) {
        inputMailElem.classList.remove('invalid');
        inputMailElem.classList.add('valid');
      } else {
        inputMailElem.classList.remove('valid');
        inputMailElem.classList.add('invalid');
      }
    };
  }
}
