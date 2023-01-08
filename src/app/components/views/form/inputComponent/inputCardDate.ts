import { HTMLTag, InfoForUser } from '../../../../types/enums';
import { Element } from '../../../element';

export class InputCardDate extends Element {
  public valid: boolean;
  private inputCardNumberElem: HTMLInputElement;
  private conditionValidValue: RegExp;
  constructor(node: HTMLElement) {
    super(node, HTMLTag.LABEL, 'form__label-card');
    this.valid = false;
    const titleBlockDateIgnor = new Element(this.elem, HTMLTag.P, 'block-date__title', 'Date');

    const conditionInvalidValue = new RegExp('[a-zа-ё[\\]{\\}(\\)\\s\\\\!?.,_;:|`\'"#№$%^&*@=+-]', 'gi');
    this.conditionValidValue = new RegExp('^((([1-2][0-9])|([3][0-1]))/(([0][0-9])|([1][0-2])))$', 'g');
    const conditionValid = new RegExp('\\d{2}$', 'g');

    const inputCardNumber = new Element(this.elem, HTMLTag.INPUT, 'block-date__input');
    this.inputCardNumberElem = <HTMLInputElement>inputCardNumber.elem;
    this.inputCardNumberElem.setAttribute('type', 'text');
    this.inputCardNumberElem.setAttribute('title', InfoForUser.INPUT_DATE);
    this.inputCardNumberElem.setAttribute('placeholder', 'Date');
    this.inputCardNumberElem.setAttribute('maxlength', '5');

    this.inputCardNumberElem.oninput = () => {
      if (conditionInvalidValue.test(this.inputCardNumberElem.value)) {
        this.inputCardNumberElem.value = this.inputCardNumberElem.value.replace(conditionInvalidValue, '');
      }
      if (conditionValid.test(this.inputCardNumberElem.value) && !/^(\d{2}\/\d{2})$/.test(this.inputCardNumberElem.value)) {
        const val = this.inputCardNumberElem.value;
        this.inputCardNumberElem.value = `${val}/`;
      }
    };

    this.inputCardNumberElem.onchange = () => {
      this.validation();
    };
  }

  public validation(): void {
    if (this.conditionValidValue.test(this.inputCardNumberElem.value)) {
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
