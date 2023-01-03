import { HTMLTag } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputMail extends Element {
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');

    const conditionInvalidValue = new RegExp('[[\\]{\\}(\\)!?,_=+-]', 'g');
    const conditionValidValue = new RegExp('\\w+[@]\\w+\\.{1}\\D{0,5}', 'g');

    const inputMail = new Element(this.elem, HTMLTag.INPUT, 'form__input-mail');
    const inputMailElem = <HTMLInputElement>inputMail.elem;
    inputMailElem.setAttribute('type', 'email');
    inputMailElem.setAttribute('pattern', `${conditionValidValue}`);
    inputMailElem.setAttribute('placeholder', 'E-mail');

    inputMailElem.oninput = () => {
      if (conditionInvalidValue.test(inputMailElem.value)) {
        inputMailElem.value = inputMailElem.value.replace(conditionInvalidValue, '');
      }
    };

    inputMailElem.onchange = () => {
      if (conditionValidValue.test(inputMailElem.value)) {
        inputMailElem.classList.remove('invalid');
        inputMailElem.classList.add('valid');
      } else {
        inputMailElem.classList.remove('valid');
        inputMailElem.classList.add('invalid');
      }
    };
  }
}
