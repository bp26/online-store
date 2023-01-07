import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';
import { InputName } from './inputComponent/inputName';
import { InputPhone } from './inputComponent/inputPhone';
import { InputAdress } from './inputComponent/inputAdress';
import { InputMail } from './inputComponent/inputMail';
import { InputCardNumber } from './inputComponent/inputCardNumber';
import { InputCardDate } from './inputComponent/inputCardDate';
import { InputCardCvv } from './inputComponent/inputCardCvv';

export class ModalView extends Element {
  constructor() {
    super(document.body, HTMLTag.DIV, 'wrapper-modal');
    const modal = new Element(this.elem, HTMLTag.DIV, 'modal-form');
    const form = new Element(modal.elem, HTMLTag.FORM, 'form');
    const titleFormIgnor = new Element(form.elem, HTMLTag.H2, 'form__title', 'Personal details');
    new InputName(form.elem);
    new InputPhone(form.elem);
    new InputAdress(form.elem);
    new InputMail(form.elem);
    const wrapperCard = new Element(form.elem, HTMLTag.DIV, 'wrapper-card');
    const titleCardIgnor = new Element(wrapperCard.elem, HTMLTag.H2, 'wrapper-card__title', 'Credit card details');
    const logoCard = new Element(wrapperCard.elem, HTMLTag.DIV, 'card-logo');
    const card = new Element(wrapperCard.elem, HTMLTag.DIV, 'modal-card');
    new InputCardNumber(card.elem, logoCard.elem);
    const blockDateOrCvv = new Element(card.elem, HTMLTag.DIV, 'block-date-or-cvv');
    new InputCardDate(blockDateOrCvv.elem);
    const blockCvv = new Element(blockDateOrCvv.elem, HTMLTag.DIV, 'block-cvv');
    new InputCardCvv(blockCvv.elem);

    const buttonCard = new Element(form.elem, HTMLTag.BUTTON, 'wrapper-card__button');
    const buttonSpanCardIgnor = new Element(buttonCard.elem, HTMLTag.SPAN, 'wrapper-card__button-span', 'Confirm');
  }
}
