import { HTMLTag, InfoForUser } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputMail extends Element {
  public valid: boolean;
  private inputMailElem: HTMLInputElement;
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label');
    this.valid = false;
    const conditionInvalidValue = new RegExp('[а-ё[\\]{\\}(\\)\\\\!?,_;<>:|/`\'"#№$%^&*+=-]', 'g');

    const inputMail = new Element(this.elem, HTMLTag.INPUT, 'form__input');
    this.inputMailElem = <HTMLInputElement>inputMail.elem;
    this.inputMailElem.setAttribute('type', 'email');
    this.inputMailElem.setAttribute('title', InfoForUser.INPUT_MAIL);
    this.inputMailElem.setAttribute('placeholder', 'E-mail');

    this.inputMailElem.oninput = () => {
      if (conditionInvalidValue.test(this.inputMailElem.value)) {
        this.inputMailElem.value = this.inputMailElem.value.replace(conditionInvalidValue, '');
      }
    };

    this.inputMailElem.onchange = () => {
      this.validation();
    };
  }

  public validation(): void {
    if (/^(\w+[.]?\w+)+[@]\w+[.]\D{0,5}$/.test(this.inputMailElem.value)) {
      this.inputMailElem.classList.remove('invalid');
      this.valid = true;
    } else {
      this.inputMailElem.classList.add('invalid');
      this.valid = false;
    }
  }
}
