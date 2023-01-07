import { HTMLTag } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputName extends Element {
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');

    const conditionInvalidValue = new RegExp('\\d', 'g');

    const inputName = new Element(this.elem, HTMLTag.INPUT, 'form__input-name');
    const inputNameElem = <HTMLInputElement>inputName.elem;
    inputNameElem.setAttribute('type', 'text');
    inputNameElem.setAttribute('placeholder', 'Name');
    inputNameElem.setAttribute('title', `Имя должно содержать не менее 2 слов длиной не менее 3 символов`);
    inputNameElem.oninput = () => {
      if (conditionInvalidValue.test(inputNameElem.value)) {
        inputNameElem.value = inputNameElem.value.replace(conditionInvalidValue, '');
      }
    };

    inputNameElem.onchange = () => {
      if (/\w{3,}\s\w{3,}[\s\w]+/.test(inputNameElem.value)) {
        inputName.elem.classList.remove('invalid');
        inputName.elem.classList.add('valid');
      } else {
        inputName.elem.classList.remove('valid');
        inputName.elem.classList.add('invalid');
      }
    };
  }
}
